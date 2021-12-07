/// <reference types="cypress" />


describe('Action list with panel header', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/in-panel-header');
    });

    it('should display page title', () => {
        cy.get('[data-cy=blui-toolbar] > .MuiToolbar-root').should('contain', 'Global Action List');
    });
});