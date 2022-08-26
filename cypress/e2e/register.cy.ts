import { login } from "./login"

const sl = {
   switch: {
      login: "#loginLogin",
      register: "#loginRegister"
   },
   signin: {
      email: "#signInEmail",
      password: "#signInPassword",
      confirm: "#signInConfirm"
   },
   register: {
      name: "#registerName",
      country: "#registerCountry",
      email: "#registerEmail",
      password: "#registerPassword",
      nuclearButton: {
         no: "label[for='hasButtonNo']",
         yes: "label[for='hasButtonYes']"
      },
      confirm: "#registerConfirm"
   }
}

describe('login screen', () => {
   beforeEach(() => {
      cy.intercept('POST', '/president', { fixture: 'president.json' })
      cy.intercept('POST', '/president/login', { fixture: 'president.json' })
      cy.intercept('GET', '/satellites', { fixture: "satellites.json" })
      cy.visit('/')
   })
   it('registers new user', () => {
      cy.get(sl.switch.register)
         .click()
      cy.get(sl.register.name)
         .type('test name')
         .get(sl.register.country)
         .type('testCountry')
         .get(sl.register.email)
         .type('test@mail.com')
         .get(sl.register.password)
         .type('test123!')
         .get(sl.register.nuclearButton.yes)
         .click()
      cy.get(sl.register.confirm)
         .click()
      cy.get('header')
         .get('main')
   })
   it('logins existing', login)
})
