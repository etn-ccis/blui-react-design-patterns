/// <reference types="cypress" />


describe('Action list', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/action-list');
    });

    it('title displays', () => {
        cy.get('[data-cy=pxb-toolbar]').should('contain', 'Action List');
    });
    
    it('add action list items', () => {
        cy.get('[data-cy=list-content]').children().should('have.length', '10');
        cy.get('[data-cy=toolbar-add]').click()
        cy.get('[data-cy=list-content]').children().should('have.length', '11');
        cy.get('[data-cy=toolbar-add]').click()
        cy.get('[data-cy=list-content]').children().should('have.length', '12');
        cy.get('[data-cy=action-menu]').first().click()
    });

    it('remove action list items', () => {
        cy.get('[data-cy=list-content]').children().should('have.length', '10');
        cy.get('[data-cy=action-menu]').first().click()
        cy.contains('Delete').click()
        cy.get('[data-cy=list-content]').children().should('have.length', '9');
        cy.get('[data-cy=action-menu]').first().click()
        cy.contains('Delete').click()
        cy.get('[data-cy=list-content]').children().should('have.length', '8');
    });

    it('remove all items & empty state', () => {
        cy.get('[data-cy=toolbar-delete]').click()
        cy.get('[data-cy=list-content]').children().should('have.length', '0');
        cy.contains('No Items Found');
        cy.get('[data-cy=pxb-empty-state-add]').click()
        cy.get('[data-cy=list-content]').children().should('have.length', '1');
    });
});