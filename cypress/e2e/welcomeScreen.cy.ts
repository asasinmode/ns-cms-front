import { login } from "./login"

const sl = {
   switch: {
      login: "#welcomeLogin",
      register: "#welcomeRegister"
   },
   login: {
      email: "#loginEmail",
      password: "#loginPassword",
      confirm: "#loginConfirm"
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

describe('welcome screen', () => {
   beforeEach(() => {
      cy.intercept('POST', '/presidents', { fixture: 'presidents.json' })
      cy.intercept('POST', '/presidents/login', { fixture: 'presidents.json' })
      cy.intercept('GET', '/satellites', { fixture: "satellites.json" })
      cy.visit('/')
   })
   afterEach(() => {
      sessionStorage.clear()
   })
   it.only('registers new user', () => {
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
