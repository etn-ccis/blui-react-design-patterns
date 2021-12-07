/// <reference types="cypress" />


describe('Contextual App Bar', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/contextual-action');
    });

    it('should display page title', () => {
        cy.get('[data-cy=app-bar]').should('contain', 'Contextual App Bar');
    });

    it('should display delete button enabled & disabled', () => {
        cy.get('[data-cy=table-cell-checkbox]').first().click()
        cy.get('[data-cy=delete-btn]').should('be.enabled')
        cy.get('[data-cy=table-cell-checkbox]').first().click()
        cy.get('[data-cy=delete-btn]').should('be.disabled')
    });

    it.skip('should display header checkbox indeterminate', () => {
        cy.get('[data-cy=table-cell-checkbox]').first().click()
        cy.get('[data-cy=table-header-checkbox]').find('input')
        .filter('input.PrivateSwitchBase-input-529')
        .should('have.attr', 'data-indeterminate', 'true')
    });

    it.skip('should not display header checkbox indeterminate', () => {
        cy.get('[data-cy=table-header-checkbox]').click()
        cy.get('[data-cy=table-header-checkbox]').find('input')
        .filter('input.PrivateSwitchBase-input-529')
        .should('have.attr', 'data-indeterminate', 'false')
    });

    it('should display no items found', () => {
        cy.get('[data-cy=table-header-checkbox]').click()
        cy.get('[data-cy=delete-btn]').click()
        cy.get('[data-cy=empty-table]').should('contain', 'No items found.')
    });

    it('should reset table when no items found', () => {
        cy.get('[data-cy=table-header-checkbox]').click()
        cy.get('[data-cy=delete-btn]').click()
        cy.get('[data-cy=empty-table]').should('contain', 'No items found.')
        cy.get('[data-cy=reset]').click()
        cy.contains('Device')
    });
});