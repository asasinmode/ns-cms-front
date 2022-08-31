import NumberInput from "../Misc/Inputs/NumberInput.vue"

const inputData = {
   props: {
      modelValue: 5,
      min: 3,
      max: 300,
      v$: {
         $errors: []
      }
   }
}

describe('<NumberInput />', () => {
   it('doesn\'t accept letters', () => {
      cy.mount(NumberInput, inputData)
         .get('input')
         .type('test5')
         .should('have.value', 55)
   })
   it('doesn\'t go below min', () => {
      cy.mount(NumberInput, inputData)
         .get('input')
         .clear()
         .type('0')
         .blur()
         .should('have.value', 3)
   })
   it('doesn\'t go above max', () => {
      cy.mount(NumberInput, inputData)
         .get('input')
         .clear()
         .type('500')
         .blur()
         .should('have.value', 300)
   })
   it('shows error text', () => {
      const errorData = {
         props: {
            modelValue: 5,
            v$: {
               $error: true,
               $errors: [{
                  $message: "test error"
               }]
            }
         }
      }
      cy.mount(NumberInput, errorData)
         .get('span')
         .should('have.text', 'test error')
   })
})
