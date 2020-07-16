/// <reference types="cypress" />


describe('Multi-select list', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/multiselect-list');
    });

    it('should display page title', () => {
        cy.get('[data-cy=pxb-toolbar]').should('contain', 'Multiselect List');
    });

    it('should add list items when add is clicked', () => {
        cy.get('[data-cy=list-content]').children().should('have.length', '10')
        cy.get('[data-cy=toolbar-add]').click().click()
        cy.get('[data-cy=list-content]').children().should('have.length', '12')

    });

    it('should remove list items when delete is clicked', () => {
        cy.get('[data-cy=list-content]').children().should('have.length', '10')
        cy.get('[type="checkbox"]').first().check({ force: true })
        cy.get('.MuiSnackbarContent-message').should('contain', '1 selected item')
        cy.get('[data-cy=snackbar-delete]').click()
        cy.get('[data-cy=list-content]').children().should('have.length', '9')        

    });

    it('should cancel selected list items', () => {
        cy.get('[data-cy=list-content]').children().should('have.length', '10')
        cy.get('[type="checkbox"]').first().check({ force: true })
        cy.get('.MuiSnackbarContent-message').should('contain', '1 selected item')
        cy.get('[data-cy=snackbar-cancel]').click()
        cy.get('[data-cy=list-content]').children().should('have.length', '10')        

    });

    it('should select all and remove list items & empty state displays', () => {
        cy.get('[data-cy=list-content]').children().should('have.length', '10')
        cy.get('[type="checkbox"]').check({ force: true })
        cy.get('.MuiSnackbarContent-message').should('contain', '10 selected items')
        cy.get('[data-cy=snackbar-delete]').click()
        cy.contains('No Items Found')
        cy.get('[data-cy=pxb-empty-state-add]').click()
        cy.get('[data-cy=list-content]').children().should('have.length', '1')

    });
});