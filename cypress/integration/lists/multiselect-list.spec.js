/// <reference types="cypress" />


describe('Multi-select list', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/multiselect-list');
    });

    it('should display page title', () => {
        cy.get('[data-cy=blui-toolbar]').should('contain', 'Multiselect List');
    });

    it('should remove list items when delete button is clicked', () => {
        cy.get('[data-cy=list-content]').should('have.length', '5')
        cy.get('[data-cy=table-header-checkbox]').first().click()
        cy.get('[data-cy=delete-btn]').click()
        cy.get('[data-cy=list-content]').should('have.length', '2')

    });

    it('should display delete button enabled & disabled', () => {
        cy.get('[data-cy=table-header-checkbox]').first().click()
        cy.get('[data-cy=delete-btn]').should('be.enabled')
        cy.get('[data-cy=table-header-checkbox]').first().click()
        cy.get('[data-cy=delete-btn]').should('be.disabled')
    });

    it('should display no results text when delete button is clicked after select all', () => {
        cy.get('[data-cy=table-header-checkbox]').first().click()
        cy.get('[data-cy=delete-btn]').click()
        cy.get('[data-cy=no-result]').should('contain', 'No results. Reset data.');
    });

    it('should reset data when no results found', () => {
        cy.get('[data-cy=table-header-checkbox]').first().click()
        cy.get('[data-cy=delete-btn]').click()
        cy.get('[data-cy=no-result]').should('contain', 'No results. Reset data.');
        cy.get('[data-cy=reset]').click()
        cy.get('[data-cy=list-content]').should('have.length', '5')
    });
});