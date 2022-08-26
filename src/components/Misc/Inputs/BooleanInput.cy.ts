import BooleanInput from "./BooleanInput.vue"

describe('<BooleanInput />', () => {
   it('starts with specified value', () => {
      cy.mount(BooleanInput, {
         props: {
            modelValue: false,
            name: 'test'
         }
      })
         .get('#testNo')
         .should('be.checked')
   })
   it('shows emoji', () => {
      cy.mount(BooleanInput, {
         props: {
            name: 'test',
            modelValue: true,
            showEmoji: true
         }
      })
         .get('label')
         .contains('yes')
         .should('contain.text', '😳')
   })
})
