
describe("Order Form - Validasyon", () => {
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
    cy.get('[data-cy="go-order"]', { timeout: 10000 })
      .should("be.visible")
      .click();
  });

  it("order sayfası açılınca form ve özet görünmeli", () => {
    cy.get('[data-cy="order-form"]').should("be.visible");
    cy.get('[data-cy="order-summary"]').should("be.visible");
    cy.get('[data-cy="submit-order"]').should("be.disabled");
  });

  it("form eksikken sipariş ver disabled olmalı", () => {
    cy.get('[data-cy="submit-order"]').should("be.disabled");
  });

  it("isim 3 karakterden kısa ise hata göstermeli ve submit disabled kalmalı", () => {
    cy.get('[data-cy="name-input"]').type("ab");
    cy.get('[data-cy="submit-order"]').should("be.disabled");
    cy.contains("İsim en az 3 karakter").should("be.visible");
  });

  it("boyut seçilince aktif olmalı", () => {
    cy.get('[data-cy="size-M"]').click().should("have.class", "isActive");
    cy.get('[data-cy="size-S"]').click().should("have.class", "isActive");
    cy.get('[data-cy="size-M"]').should("not.have.class", "isActive");
  });

  it("en az 4 malzeme seçmeden submit olmamalı", () => {
    cy.get('[data-cy="name-input"]').type("Burak");
    cy.get('[data-cy="size-M"]').click();
    cy.get('[data-cy="hamur"]').select("İnce");

    cy.get('[data-cy="malzeme-Pepperoni"]').check({ force: true });
    cy.get('[data-cy="malzeme-Sosis"]').check({ force: true });
    cy.get('[data-cy="malzeme-Mısır"]').check({ force: true });

    cy.get('[data-cy="submit-order"]').should("be.disabled");
    cy.contains("En az 4 malzeme seçmelisin.").should("be.visible");
  });

  it("4 malzeme seçince submit aktif olmalı", () => {
    fillMinimumValidForm();
    cy.get('[data-cy="submit-order"]').should("not.be.disabled");
  });

  it("hamur seçilmeden hamur hatası görünmeli", () => {
    cy.get('[data-cy="name-input"]').type("Burak");
    cy.get('[data-cy="size-M"]').click();

    cy.get('[data-cy="malzeme-Pepperoni"]').check({ force: true });
    cy.get('[data-cy="malzeme-Sosis"]').check({ force: true });
    cy.get('[data-cy="malzeme-Mısır"]').check({ force: true });
    cy.get('[data-cy="malzeme-Ananas"]').check({ force: true });

    cy.get('[data-cy="submit-order"]').should("be.disabled");
    cy.contains("Hamur seçmelisin.").should("be.visible");
  });

  it("boyut seçilmeden boyut hatası görünmeli", () => {
    cy.get('[data-cy="name-input"]').type("Burak");
    cy.get('[data-cy="hamur"]').select("İnce");

    cy.get('[data-cy="malzeme-Pepperoni"]').check({ force: true });
    cy.get('[data-cy="malzeme-Sosis"]').check({ force: true });
    cy.get('[data-cy="malzeme-Mısır"]').check({ force: true });
    cy.get('[data-cy="malzeme-Ananas"]').check({ force: true });

    cy.get('[data-cy="submit-order"]').should("be.disabled");
    cy.contains("Boyut seçmelisin.").should("be.visible");
  });

  it("en fazla 10 malzeme seçilebilmeli (11. disable olmalı)", () => {
    cy.get('[data-cy="name-input"]').type("Burak");
    cy.get('[data-cy="size-M"]').click();
    cy.get('[data-cy="hamur"]').select("İnce");

    const list10 = [
      "Pepperoni",
      "Sosis",
      "Mısır",
      "Sucuk",
      "Domates",
      "Soğan",
      "Biber",
      "Ananas",
      "Kabak",
      "Sarımsak",
    ];

    list10.forEach((m) => cy.get(`[data-cy="malzeme-${m}"]`).check({ force: true }));

    cy.get('[data-cy="malzeme-Jalepeno"]').should("be.disabled");
    cy.contains("En fazla 10 malzeme").should("be.visible");
  });

  it("fiyat doğru hesaplanmalı", () => {

    fillMinimumValidForm({ size: "M", dough: "İnce", ingredients: ["Pepperoni", "Sosis", "Mısır", "Ananas"] });

    cy.get('[data-cy="secimler-fiyat"]').should("contain", "20.00");
    cy.get('[data-cy="toplam-fiyat"]').should("contain", "105.50");
  });

  it("adet artınca toplam fiyat artmalı", () => {
    fillMinimumValidForm();

    cy.get('[data-cy="sum-total"]').invoke("text").then((t1) => {
      cy.get('[data-cy="qty-inc"]').click();

      cy.get('[data-cy="sum-total"]').invoke("text").then((t2) => {
        const n1 = parseFloat(String(t1).replace("₺", "").replace(",", "."));
        const n2 = parseFloat(String(t2).replace("₺", "").replace(",", "."));
        expect(n2).to.be.greaterThan(n1);
      });
    });
  });

  it("adet 1'in altına düşmemeli", () => {
    cy.get('[data-cy="qty-val"]').should("contain", "1");
    cy.get('[data-cy="qty-dec"]').click();
    cy.get('[data-cy="qty-val"]').should("contain", "1");
  });

  it("sipariş verince POST atılmalı ve body boyut doğru olmalı", () => {
    cy.intercept("POST", "/reqres/api/users", {
      statusCode: 201,
      body: { id: "999", createdAt: "2026-02-14T00:00:00.000Z" },
    }).as("createOrder");

    fillMinimumValidForm({ size: "M", dough: "Orta" });

    cy.get('[data-cy="submit-order"]').click();

    cy.wait("@createOrder")
      .its("request.body")
      .should("have.property", "boyut", "M");
  });

  it("submit'e basınca buton 'Gönderiliyor...' olmalı (intercept delay)", () => {
    cy.intercept("POST", "/reqres/api/users", (req) => {
      req.reply((res) => {
        res.delay = 800;
        res.send({ id: "123", createdAt: new Date().toISOString() });
      });
    }).as("createOrderDelayed");

    fillMinimumValidForm();

    cy.get('[data-cy="submit-order"]').click();
    cy.get('[data-cy="submit-order"]').should("contain", "Gönderiliyor...");

    cy.wait("@createOrderDelayed");
  });
  
it("POST başarısız olunca hata mesajı görünmeli (intercept fail)", () => {
  cy.intercept("POST", "/reqres/api/users", {
    statusCode: 500,
    body: { error: "server down" },
  }).as("createOrderFail");

  fillMinimumValidForm(); 

  cy.get('[data-cy="submit-order"]').should("not.be.disabled").click();

  cy.wait("@createOrderFail");

  cy.get('[data-cy="submit-error"]', { timeout: 10000 })
    .should("be.visible")
    .and("contain", "İnternet'e bağlanılamadı");
});


  it("form doğru doldurulunca success ekranına geçmeli", () => {
    cy.intercept("POST", "/reqres/api/users", {
      statusCode: 201,
      body: { id: "999", createdAt: "2026-02-14T00:00:00.000Z" },
    }).as("createOrder");

    fillMinimumValidForm({ size: "L", dough: "Orta" });

    cy.get('[data-cy="submit-order"]').should("not.be.disabled").click();
    cy.wait("@createOrder");

    cy.get('[data-cy="success-title"]', { timeout: 10000 })
      .should("contain", "SİPARİŞ ALINDI");
  });
});



