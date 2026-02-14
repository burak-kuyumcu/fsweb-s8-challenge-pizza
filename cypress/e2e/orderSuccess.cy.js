describe("Order - Success Akışı", () => {
  it("form doldurunca success ekranına geçmeli ve sipariş alındı yazmalı", () => {
    cy.visit("/");
    cy.get('[data-cy="go-order"]').click();
    cy.get('[data-cy="size-L"]').click();
    cy.get('[data-cy="hamur"]').select("Orta");
    cy.get('[data-cy="malzeme-Pepperoni"]').check({ force: true });
    cy.get('[data-cy="malzeme-Sosis"]').check({ force: true });
    cy.get('[data-cy="malzeme-Mısır"]').check({ force: true });
    cy.get('[data-cy="malzeme-Ananas"]').check({ force: true });
    cy.get('[data-cy="submit-order"]').should("not.be.disabled").click();
    cy.get('[data-cy="success-title"]').should("contain", "SİPARİŞ ALINDI");
    cy.get('[data-cy="back-home"]').should("be.visible");
  });
});
