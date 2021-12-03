/// <reference types="cypress" />


describe('Form validation in a table', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/in-a-table');
    });

    it('should display page title', () => {
        cy.get('[data-cy=blui-toolbar]').should('contain', 'In a Table');
    });
});