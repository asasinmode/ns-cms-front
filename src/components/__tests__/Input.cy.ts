import Input from "../Misc/Inputs/Input.vue"

const inputData = {
   props: {
      placeholder: 'test',
      id: 'test',
      v$: {
         $errors: []
      }
   }
}

describe('<Input />', () => {
   it('renders placeholder', () => {
      cy.mount(Input, inputData)
         .get('label')
         .should('have.text', 'test')
   })
   it('shows helper text', () => {
      const helperData = {
         props: {
            ...inputData.props,
            helperText: "helper text"
         }
      }
      cy.mount(Input, helperData)
         .get('span')
         .should('have.text', 'helper text')
   })
   it('shows error text', () => {
      const errorData = {
         props: {
            ...inputData.props,
            v$: {
               $error: true,
               $errors: [{
                  $message: "test error"
               }]
            }
         }
      }
      cy.mount(Input, errorData)
         .get('span')
         .should('have.text', 'test error')
         .should('have.class', 'text-neon-red')
   })
})
