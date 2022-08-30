import WelcomeScreen from "../WelcomeScreen.vue"

const errorSpanSelector = 'span.text-neon-red'

describe('<Login />', () => {
   it('renders switch buttons', () => {
      cy.mount(WelcomeScreen)
         .get('#welcomeLogin')
         .should('be.visible')
         .get('#welcomeRegister')
         .should('be.visible')
   })
   it('switches between login and register', () => {
      cy.mount(WelcomeScreen)
         .get('#welcomeRegister')
         .click()
         .get('#registerConfirm')
         .get('#welcomeLogin')
         .click()
         .get('#loginConfirm')
   })
   describe("sign in", () => {
      describe('renders inputs', () => {
         beforeEach(() => {
            cy.mount(WelcomeScreen)
         })
         it('email', () => {
            cy.get('#loginEmail')
         })
         it('password', () => {
            cy.get('#loginPassword')
         })
      })
      describe('rejects', () => {
         beforeEach(() => {
            cy.mount(WelcomeScreen)
               .get('#loginConfirm')
               .click()
         })
         it('empty email', () => {
            cy.get('#loginEmail')
               .parent()
               .find(errorSpanSelector)
               .should('be.visible')
         })
         it('empty password', () => {
            cy.get('#loginPassword')
               .parent()
               .find(errorSpanSelector)
               .should('be.visible')
         })
      })
   })
   describe('register', () => {
      beforeEach(() => {
         cy.mount(WelcomeScreen)
            .get('#welcomeRegister')
            .click()
      })
      describe('renders inputs', () => {
         it('name', () => {
            cy.get('#registerName')
         })
         it('country', () => {
            cy.get('#registerCountry')
         })
         it('email', () => {
            cy.get('#registerEmail')
         })
         it('password', () => {
            cy.get('#registerPassword')
         })
         it('nuclear button', () => {
            cy.get('fieldset')
               .find('legend')
               .should('not.be.empty')
         })
      })
      describe('rejects', () => {
         beforeEach(() => {
            cy.get('#registerConfirm')
               .click()
         })
         it('empty name', () => {
            cy.get('#registerName')
               .parent()
               .find(errorSpanSelector)
               .should('be.visible')
         })
         it('empty country', () => {
            cy.get('#registerCountry')
               .parent()
               .find(errorSpanSelector)
               .should('be.visible')
         })
         it('empty email', () => {
            cy.get('#registerEmail')
               .parent()
               .find(errorSpanSelector)
               .should('be.visible')
         })
         it('empty password', () => {
            cy.get('#registerPassword')
               .parent()
               .find(errorSpanSelector)
               .should('be.visible')
         })
         describe("invalid", () => {
            it("email invalid", () => {
               cy.get("#registerEmail")
                  .type("invalid")
               cy.get("#registerConfirm")
                  .click()
               cy.get("#registerEmail")
                  .parent()
                  .find(errorSpanSelector)
                  .should('be.visible')
            })
            it("password", () => {
               cy.get("#registerPassword")
                  .type("notSecure")
               cy.get("#registerConfirm")
                  .click()
               cy.get("#registerPassword")
                  .parent()
                  .find(errorSpanSelector)
                  .should('be.visible')
            })
         })
      })
   })
})