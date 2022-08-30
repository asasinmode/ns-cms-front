import { login } from "./login"

const sl = {
   logout: "button[title='logout']",
   expandNew: '#buttonExpandnew',

}

const inputFromLabel = (satelliteWidgetExpandButtonID: string, label: string) => {
   return cy.get(satelliteWidgetExpandButtonID)
      .siblings('div')
      .contains('label', label)
      .invoke('attr', 'for')
      .then((id) => cy.get(`#${ id }`))
}
const aiLabels = (satelliteWidgetExpandButtonID: string) => {
   return cy.get(satelliteWidgetExpandButtonID)
      .siblings('div')
      .contains('legend', 'does it have AI?')
      .siblings('div')
      .find('label')
}

describe('navigation', () => {
   it('logs out', () => {
      cy.intercept('GET', '/satellites', { fixture: 'satellites.json' })
      cy.visit('/')
      login()
      cy.get(sl.logout)
         .click()
      sessionStorage.clear()
      cy.get('article')
         .contains('login')
   })
})

describe('satellites', () => {
   beforeEach(() => {
      cy.intercept('GET', '/satellites', { fixture: 'satellites.json' })
      cy.intercept('POST', '/satellites', { fixture: 'newSatellite.json' })
      cy.intercept('DELETE', '/satellites/*', { statusCode: 204 }).as('deleteSatellite')
      cy.visit('/')
      login()
   })
   afterEach(() => {
      sessionStorage.clear()
   })
   it('renders satellite widgets', () => {
      cy.get('button[id^="buttonExpand"]')
         .not(sl.expandNew)
         .should('not.be.empty')
   })
   it('renders new satellite button', () => {
      cy.get(sl.expandNew)
   })
   describe('functionality', () => {
      it('add new satellite', () => {
         cy.get(sl.expandNew)
            .click()
         inputFromLabel(sl.expandNew, 'side number')
            .type('testNew')
         inputFromLabel(sl.expandNew, 'software version')
            .type('0.0.1')
         inputFromLabel(sl.expandNew, 'manufacturer')
            .type('newfacturer')
         inputFromLabel(sl.expandNew, 'model')
            .type('newdel')
         inputFromLabel(sl.expandNew, 'vintage:')
            .clear()
            .type('1999')
         inputFromLabel(sl.expandNew, 'ammunition left:')
            .clear()
            .type('42')
         inputFromLabel(sl.expandNew, 'altitude (km):')
            .clear()
            .type('200')
         aiLabels(sl.expandNew)
            .contains('yes')
            .click()
         cy.get(sl.expandNew)
            .siblings('div')
            .contains('create')
            .click()
         cy.get('button[id^="buttonExpand"]')
            .contains('testNew') // same as newSatellite.json
      })
      it('deletes satellite', () => {
         let originalLength: number
         cy.get('button[id^="buttonExpand"]')
            .then((buttons) => {
               originalLength = buttons.length
               return buttons[0]
            })
            .click()
            .siblings('div')
            .contains('delete')
            .click()
         cy.get('#modalConfirmButton')
            .click()
            .wait('@deleteSatellite')
         cy.get('button[id^="buttonExpand"]')
            .then((buttons) => {
               assert(buttons.length < originalLength, 'less satellite buttons than originally')
            })
      })
   })
})
