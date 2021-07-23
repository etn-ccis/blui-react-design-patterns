/// <reference types="cypress" />


describe('Collapsible app bar', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/collapsible');
    });

    it('should display banner', () => {
        cy.get('[data-cy=banner]').should('be.visible')
    });

    // it('should display tool bar on scroll', () => {
    //     cy.get('#scroll-area > .MuiList-root').scrollIntoView({ duration: 1000, offset:{ top: 0, left: 0 }})
    //     cy.get('[data-cy=app-bar] > .MuiToolbar-root').scrollIntoView().should('be.visible')
    // });
});