import Input from "../Misc/Inputs/Input.vue"

const inputData = {
   props: {
      placeholder: 'test',
      id: 'test'
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
            errorText: "error text",
            showError: true
         }
      }
      cy.mount(Input, errorData)
         .get('span')
         .should('have.text', 'error text')
         .should('have.class', 'text-neon-red')
   })
})
