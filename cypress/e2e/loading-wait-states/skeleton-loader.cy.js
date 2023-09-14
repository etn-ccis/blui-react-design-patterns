/// <reference types="cypress" />


describe('Skeleton loading state', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/skeletons');
    });

    it('should display page title', () => {
        cy.get('[data-cy=blui-toolbar]').should('contain', 'Skeletons')
    });

    it('Should trigger score card skeleton loading on refresh', () => {
        cy.reload()
        cy.get('[data-cy=skeleton]')
        .invoke('attr', 'data-cy')
        .should('equal', 'skeleton')
    });
});