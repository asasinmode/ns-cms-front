export const login = () => {
   cy.intercept('POST', '/president/login', { fixture: 'president.json' })
   cy.intercept('GET', '/satellites', { fixture: "satellites.json" })
   cy.get('#signInEmail')
      .type('test@mail.com')
      .get('#signInPassword')
      .type('test123!')
   cy.get('#signInConfirm')
      .click()
   cy.get('header')
      .get('main')
}