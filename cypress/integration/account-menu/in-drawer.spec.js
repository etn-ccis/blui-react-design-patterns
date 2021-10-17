/// <reference types="cypress" />


describe('Account menu in drawer', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/in-a-drawer');
    });

    it('should display title and subtitle', () => {
        cy.get('[data-cy=toolbar]').should('contain', 'In a Drawer');
    });

    it('should display drawer when toggled', () => {
        cy.get('[data-cy=toggle-drawer]').click()
        cy.get('[data-cy=drawer-header]').should('be.visible')
    });

    it('should dismiss drawer on click', () => {
        cy.get('[data-cy=toggle-drawer]').click()
        cy.get('[data-cy=drawer-header]').should('be.visible')
        cy.get('body').click()
    });
});