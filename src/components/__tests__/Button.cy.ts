import Button from "../Misc/Button.vue"

describe('<Button />', () => {
   it('renders content', () => {
      cy.mount(Button, { slots: { default: () => 'content' } })
         .get('button')
         .should('have.text', 'content')
   })
   it('changes color with prop', () => {
      cy.mount(Button, { props: { selected: true }, slots: { default: () => 'selected' } })
         .get('button')
         .should('have.css', 'background-color', 'rgb(57, 255, 20)')
         .should('have.css', 'color', 'rgb(0, 0, 0)')
   })
})
