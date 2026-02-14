describe("Order - Success Akışı", () => {
  const fillAndSubmit = ({ size = "L", dough = "Orta" } = {}) => {
    cy.get('[data-cy="name-input"]').clear().type("Burak");
    cy.get(`[data-cy="size-${size}"]`).click();
    cy.get('[data-cy="hamur"]').select(dough);
    cy.get('[data-cy="malzeme-Pepperoni"]').check({ force: true });
    cy.get('[data-cy="malzeme-Sosis"]').check({ force: true });
    cy.get('[data-cy="malzeme-Mısır"]').check({ force: true });
    cy.get('[data-cy="malzeme-Ananas"]').check({ force: true });
    cy.get('[data-cy="submit-order"]').click();
  };

  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-cy="go-order"]', { timeout: 10000 }).should("be.visible").click();
  });

  it("form doldurunca success ekranına geçmeli ve sipariş alındı yazmalı", () => {
    cy.intercept("POST", "**/api/pizza", {
      statusCode: 201,
      body: { id: "ABC-001", createdAt: "2026-02-14T00:00:00.000Z" },
    }).as("createOrderOk");

    fillAndSubmit({ size: "L", dough: "Orta" });
    cy.wait("@createOrderOk", { timeout: 10000 });
    cy.get('[data-cy="success-title"]').should("contain", "SİPARİŞ ALINDI");
    cy.get('[data-cy="back-home"]').should("be.visible");
  });

  it("success ekranında boyut ve hamur bilgisi görünmeli", () => {
    cy.intercept("POST", "**/api/pizza", {
      statusCode: 201,
      body: { id: "999", createdAt: new Date().toISOString() },
    }).as("createOrderOk");

    fillAndSubmit({ size: "S", dough: "Kalın" });
    cy.wait("@createOrderOk", { timeout: 10000 });
    cy.get('[data-cy="success-size"]').should("contain", "S");
    cy.get('[data-cy="success-dough"]').should("contain", "Kalın");
  });

  it("success ekranında sipariş no görünmeli (id)", () => {
    cy.intercept("POST", "**/api/pizza", {
      statusCode: 201,
      body: { id: "ABC-123", createdAt: new Date().toISOString() },
    }).as("createOrderOk2");

    fillAndSubmit({ size: "M", dough: "Orta" });
    cy.wait("@createOrderOk2", { timeout: 10000 });
    cy.get('[data-cy="success-order-no"]').should("contain", "ABC-123");
  });

  it("anasayfaya dön butonu çalışmalı", () => {
    cy.intercept("POST", "**/api/pizza", {
      statusCode: 201,
      body: { id: "HOME-1", createdAt: new Date().toISOString() },
    }).as("createOrderOk3");

    fillAndSubmit({ size: "L", dough: "İnce" });
    cy.wait("@createOrderOk3", { timeout: 10000 });
    cy.get('[data-cy="back-home"]').click();
    cy.get('img[alt="Ana sayfa banner"]', { timeout: 10000 }).should("be.visible");
  });
});
