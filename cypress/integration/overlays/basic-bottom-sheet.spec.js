/// <reference types="cypress" />


describe('Basic bottom sheet', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/basic-bottom-sheet');
    });

    it('should display page title', () => {
        cy.get('[data-cy=blui-toolbar]').should('contain', 'Basic Bottom Sheet');
    });

    it('should display bottom sheet and action items', () => {
        cy.get('[data-cy=toolbar-action-menu]').click()
        cy.get('[data-cy=ack]').should('contain', 'Acknowledge All')
        cy.get('[data-cy=export]').should('contain', 'Export')
        cy.get('[data-cy=cancel]').should('contain', 'Cancel')
    });
});