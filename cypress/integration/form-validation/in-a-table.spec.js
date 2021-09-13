/// <reference types="cypress" />


describe('Form validation', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/in-a-table');
    });

    it('should display page title', () => {
        cy.get('[data-cy=pxb-toolbar]').should('contain', 'In a Table');
    });
});