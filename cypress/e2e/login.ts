export const login = () => {
   cy.intercept('POST', '/presidents/login', { fixture: 'presidents.json' })
   cy.intercept('GET', '/satellites', { fixture: "satellites.json" })
   cy.get('#loginEmail')
      .type('test@mail.com')
      .get('#loginPassword')
      .type('test123!')
   cy.get('#loginConfirm')
      .click()
   cy.get('header')
      .get('main')
}