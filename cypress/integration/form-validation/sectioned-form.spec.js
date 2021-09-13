/// <reference types="cypress" />


describe('Form validation', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/in-a-sectioned-form');
    });

    it('should display page title', () => {
        cy.get('[data-cy=pxb-toolbar]').should('contain', 'Sectioned Form');
    });
});