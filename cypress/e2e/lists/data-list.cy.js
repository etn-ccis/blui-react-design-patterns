/// <reference types="cypress" />


describe('Data list', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/data-list');
    });

    it('should display page title', () => {
        cy.get('[data-cy=blui-toolbar]').should('contain', 'Data List');
    });

    it('should display list', () => {
        cy.contains('George Washington')
        cy.contains('John Adams')
        cy.contains('Thomas Jefferson')
        cy.contains('James Madison')
        cy.contains('James Monroe')

    });
});