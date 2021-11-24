/// <reference types="cypress" />


describe('Progress bar loading', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/progress-bar');
    });

    it('should display page title', () => {
        cy.get('[data-cy=blui-toolbar]').should('contain', 'Progress Bars')
    });

    it('Should trigger progress bar on load', () => {
        cy.get('[data-cy=upload-btn]').click()
        cy.get('[data-cy=upload-status-snackbar]').should('be.visible')
    });
});