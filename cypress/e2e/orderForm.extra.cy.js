describe("Order Form - Ek Testler", () => {
  const fillMinimumValidForm = ({
    name = "Burak",
    size = "M",
    dough = "Orta",
    ingredients = ["Pepperoni", "Sosis", "Mısır", "Ananas"],
  } = {}) => {
    cy.get('[data-cy="name-input"]').clear().type(name);
    cy.get(`[data-cy="size-${size}"]`).click();
    cy.get('[data-cy="hamur"]').select(dough);

    ingredients.forEach((m) => {
      cy.get(`[data-cy="malzeme-${m}"]`).check({ force: true });
    });
  };

  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-cy="go-order"]', { timeout: 10000 }).should("be.visible").click();
  });

  it("4 malzemeden 3'e düşürünce submit tekrar disabled olmalı", () => {
    fillMinimumValidForm();
    cy.get('[data-cy="submit-order"]').should("not.be.disabled");

    cy.get('[data-cy="malzeme-Ananas"]').uncheck({ force: true });

    cy.get('[data-cy="submit-order"]').should("be.disabled");
    cy.contains("En az 4 malzeme seçmelisin.").should("be.visible");
  });

  it("isim baş/son boşlukları trimlenip payload'a doğru gitmeli", () => {
    cy.intercept("POST", "/reqres/api/users", {
      statusCode: 201,
      body: { id: "1", createdAt: "2026-02-14T00:00:00.000Z" },
    }).as("createOrder");

    fillMinimumValidForm({ name: "   Burak   " });
    cy.get('[data-cy="submit-order"]').click();

    cy.wait("@createOrder").its("request.body").then((body) => {
      expect(body).to.have.property("isim", "Burak");
    });
  });

  it("adet artınca payload.adet güncellenmeli", () => {
    cy.intercept("POST", "/reqres/api/users", {
      statusCode: 201,
      body: { id: "2", createdAt: "2026-02-14T00:00:00.000Z" },
    }).as("createOrder");

    fillMinimumValidForm();
    cy.get('[data-cy="qty-inc"]').click();
    cy.get('[data-cy="qty-val"]').should("contain", "2");

    cy.get('[data-cy="submit-order"]').click();
    cy.wait("@createOrder").its("request.body").then((body) => {
      expect(body).to.have.property("adet", 2);
    });
  });

  it("double click yapılınca POST sadece 1 kez atılmalı", () => {
    let hitCount = 0;

    cy.intercept("POST", "/reqres/api/users", (req) => {
      hitCount += 1;
      req.reply({
        statusCode: 201,
        body: { id: "3", createdAt: "2026-02-14T00:00:00.000Z" },
      });
    }).as("createOrder");

    fillMinimumValidForm();
    cy.get('[data-cy="submit-order"]').dblclick();

    cy.wait("@createOrder").then(() => {
      expect(hitCount).to.eq(1);
    });
  });

  it("submit sırasında buton disabled olmalı", () => {
    cy.intercept("POST", "/reqres/api/users", (req) => {
      req.reply((res) => {
        res.delay = 900;
        res.send({ id: "4", createdAt: new Date().toISOString() });
      });
    }).as("createOrderDelayed");

    fillMinimumValidForm();
    cy.get('[data-cy="submit-order"]').click();

    cy.get('[data-cy="submit-order"]')
      .should("be.disabled")
      .and("contain", "Gönderiliyor...");

    cy.wait("@createOrderDelayed");
  });

  it("malzeme sayısı artınca seçim fiyatı anlık artmalı (20 -> 25)", () => {
    fillMinimumValidForm({ ingredients: ["Pepperoni", "Sosis", "Mısır", "Ananas"] });

    cy.get('[data-cy="secimler-fiyat"]').should("contain", "20.00");

    cy.get('[data-cy="malzeme-Domates"]').check({ force: true });
    cy.get('[data-cy="secimler-fiyat"]').should("contain", "25.00");
  });

  it("POST 500 olunca hata mesajı görünmeli (forceNetworkError yerine)", () => {
    cy.intercept("POST", "/reqres/api/users", {
      statusCode: 500,
      body: { error: "server error" },
    }).as("createOrderFail500");

    fillMinimumValidForm();
    cy.get('[data-cy="submit-order"]').click();

    cy.wait("@createOrderFail500");

    cy.get('[data-cy="submit-error"]', { timeout: 10000 })
      .should("be.visible")
      .and("contain", "İnternet'e bağlanılamadı");
  });

  it("success sonrası form reset olmalı (anasayfaya dön -> tekrar sipariş)", () => {
    cy.intercept("POST", "/reqres/api/users", {
      statusCode: 201,
      body: { id: "9", createdAt: "2026-02-14T00:00:00.000Z" },
    }).as("createOrderOk");

    fillMinimumValidForm({ name: "Burak", size: "L", dough: "Kalın" });
    cy.get('[data-cy="submit-order"]').click();
    cy.wait("@createOrderOk");

    cy.get('[data-cy="success-title"]', { timeout: 10000 }).should("contain", "SİPARİŞ ALINDI");
    cy.get('[data-cy="back-home"]').click();

    cy.get('[data-cy="go-order"]', { timeout: 10000 }).should("be.visible").click();

    cy.get('[data-cy="name-input"]').should("have.value", "");
    cy.get('[data-cy="qty-val"]').should("contain", "1");
    cy.get('[data-cy="submit-order"]').should("be.disabled");
  });
});
