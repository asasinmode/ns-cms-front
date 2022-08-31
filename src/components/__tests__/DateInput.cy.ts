import DateInput from "../Misc/Inputs/DateInput.vue"

const currentDate = new Date('01 Jan 2000 00:00:00 GMT')
const inputData = {
   props: {
      modelValue: currentDate,
      id: "test",
      min: new Date('01 Jan 1950 00:00:00 GMT'),
      max: new Date('01 Jan 2050 00:00:00 GMT'),
      v$: {
         $errors: []
      }
   }
}

describe('<DateInput />', () => {
   it('renders passed date', () => {
      cy.mount(DateInput, inputData)
         .get('input')
         .should('have.value', '2000-01-01')
   })
   it('shows error text', () => {
      cy.mount(DateInput, {
         props: {
            ...inputData.props,
            v$: {
               $error: true,
               $errors: [{
                  $message: "test error"
               }]
            }
         }
      })
         .get('span')
         .should('be.visible')
         .should('have.text', 'test error')
   })
})
