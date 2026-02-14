describe("Order - Success Akışı", () => {
  const fillAndSubmit = ({ size = "L", dough = "Orta" } = {}) => {
    cy.get('[data-cy="name-input"]').type("Burak");
    cy.get(`[data-cy="size-${size}"]`).click();
    cy.get('[data-cy="hamur"]').select(dough);

    cy.get('[data-cy="malzeme-Pepperoni"]').check({ force: true });
    cy.get('[data-cy="malzeme-Sosis"]').check({ force: true });
    cy.get('[data-cy="malzeme-Mısır"]').check({ force: true });
    cy.get('[data-cy="malzeme-Ananas"]').check({ force: true });

    cy.get('[data-cy="submit-order"]').should("not.be.disabled").click();
  };

  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-cy="go-order"]', { timeout: 10000 }).should("be.visible").click();
  });

  it("form doldurunca success ekranına geçmeli ve sipariş alındı yazmalı", () => {
    cy.intercept("POST", "/reqres/api/users", {
      statusCode: 201,
      body: { id: "ABC-001", createdAt: "2026-02-14T00:00:00.000Z" },
    }).as("createOrderOk");

    fillAndSubmit({ size: "L", dough: "Orta" });
    cy.wait("@createOrderOk");

    cy.get('[data-cy="success-title"]', { timeout: 10000 }).should("contain", "SİPARİŞ ALINDI");
    cy.get('[data-cy="back-home"]').should("be.visible");
  });

  it("success ekranında boyut ve hamur bilgisi görünmeli", () => {
    cy.intercept("POST", "/reqres/api/users", {
      statusCode: 201,
      body: { id: "999", createdAt: new Date().toISOString() },
    }).as("createOrderOk");

    fillAndSubmit({ size: "S", dough: "Kalın" });
    cy.wait("@createOrderOk");

    cy.get('[data-cy="success-size"]').should("contain", "S");
    cy.get('[data-cy="success-dough"]').should("contain", "Kalın");
  });

  it("success ekranında sipariş no görünmeli (id)", () => {
    cy.intercept("POST", "/reqres/api/users", {
      statusCode: 201,
      body: { id: "ABC-123", createdAt: new Date().toISOString() },
    }).as("createOrderOk2");

    fillAndSubmit({ size: "M", dough: "Orta" });
    cy.wait("@createOrderOk2");

    cy.get('[data-cy="success-order-no"]').should("contain", "ABC-123");
  });

  it("anasayfaya dön butonu çalışmalı", () => {
    cy.intercept("POST", "/reqres/api/users", {
      statusCode: 201,
      body: { id: "HOME-1", createdAt: new Date().toISOString() },
    }).as("createOrderOk3");

    fillAndSubmit({ size: "L", dough: "İnce" });
    cy.wait("@createOrderOk3");

    cy.get('[data-cy="back-home"]').should("be.visible").click();

 
    cy.get('img[alt="Ana sayfa banner"]').should("be.visible");
  });
});
