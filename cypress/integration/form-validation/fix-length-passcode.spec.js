/// <reference types="cypress" />


describe('Form validation', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/fixed-length-passcode');
    });

    it('should display page title', () => {
        cy.get('[data-cy=pxb-toolbar]').should('contain', 'Fixed Length Passcode');
    });
});