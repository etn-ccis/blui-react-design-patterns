/// <reference types="cypress" />


describe('Basic bottom sheet', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/basic-bottom-sheet');
    });

    it('title displays', () => {
        cy.get('[data-cy=pxb-toolbar]').should('contain', 'Basic Bottom Sheet');
    });

    it('bottom sheet opens & action items', () => {
        cy.get('[data-cy=toolbar-action-menu]').click()
        cy.get('[data-cy=ack]').should('contain', 'Acknowledge All')
        cy.get('[data-cy=export]').should('contain', 'Export')
        cy.get('[data-cy=cancel]').should('contain', 'Cancel')
    });
});