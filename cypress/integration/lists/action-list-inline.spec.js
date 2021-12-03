/// <reference types="cypress" />


describe('Action list inline', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/inline-actions');
    });

    it('should display page title', () => {
        cy.get('[data-cy=blui-toolbar] > .MuiToolbar-root').should('contain', 'Local Item Actions');
    });
});