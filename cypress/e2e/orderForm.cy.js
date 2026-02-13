describe("Order Form - Validasyon", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-cy="go-order"]').click();
  });

  it("form eksikken sipariş ver disabled olmalı", () => {
    cy.get('[data-cy="submit-order"]').should("be.disabled");
  });

  it("en az 4 malzeme seçmeden submit olmamalı", () => {
    cy.get('[data-cy="size-M"]').click();
    cy.get('[data-cy="hamur"]').select("İnce");

    cy.get('[data-cy="malzeme-Pepperoni"]').check({ force: true });
    cy.get('[data-cy="malzeme-Sosis"]').check({ force: true });
    cy.get('[data-cy="malzeme-Mısır"]').check({ force: true });

    cy.get('[data-cy="submit-order"]').should("be.disabled");
    cy.contains("En az 4 malzeme seçmelisin.").should("be.visible");
  });
});
