/// <reference types="cypress" />


describe('Form validation', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/verify-on-submit');
    });

    it('should display page title', () => {
        cy.get('[data-cy=pxb-toolbar]').should('contain', 'Verify on Submit');
    });
});