/// <reference types="cypress" />


describe('Form validation in a list', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/in-a-list');
    });

    it('should display page title', () => {
        cy.get('[data-cy=blui-toolbar]').should('contain', 'In a List');
    });

    it('should display ip address left aligned', () => {
        cy.get('[data-cy=ip-address]').invoke('css', 'text-align').should('equal', 'left')
    });
});