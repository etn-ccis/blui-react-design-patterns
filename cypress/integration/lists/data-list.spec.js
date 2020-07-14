/// <reference types="cypress" />


describe('Data list', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/data-list');
    });

    it('title displays', () => {
        cy.get('[data-cy=pxb-toolbar]').should('contain', 'Data List');
    });

    it('data list loads', () => {
        cy.contains('George Washington')
        cy.contains('John Adams')
        cy.contains('Thomas Jefferson')
        cy.contains('James Madison')
        cy.contains('James Monroe')

    });
});