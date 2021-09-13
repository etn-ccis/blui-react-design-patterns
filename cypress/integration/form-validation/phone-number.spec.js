/// <reference types="cypress" />


describe('Form validation', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/phone-number-format');
    });

    it('should display page title', () => {
        cy.get('[data-cy=pxb-toolbar]').should('contain', 'Phone Number Format');
    });
});