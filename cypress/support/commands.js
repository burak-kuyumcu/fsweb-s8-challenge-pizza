// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("fillValidOrder", (size="M", dough="İnce") => {
  cy.get(`[data-cy="size-${size}"]`).click();
  cy.get('[data-cy="hamur"]').select(dough);
  cy.get('[data-cy="malzeme-Pepperoni"]').check({ force: true });
  cy.get('[data-cy="malzeme-Sosis"]').check({ force: true });
  cy.get('[data-cy="malzeme-Mısır"]').check({ force: true });
  cy.get('[data-cy="malzeme-Ananas"]').check({ force: true });
});