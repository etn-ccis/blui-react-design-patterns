/// <reference types="cypress" />


describe('Loading states', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/loading-states');
    });

    it('title displays', () => {
        cy.get('[data-cy=pxb-toolbar]').should('contain', 'Loading States');
        cy.wait(500)
    });

    it('refresh triggers placeholders ', () => {
        cy.get('[data-cy=toolbar-refresh]').click()
        cy.get(':nth-child(1) > .MuiPaper-root > [data-cy=placeholder]').should('be.visible')
        cy.wait(300)
        cy.get(':nth-child(1) > .MuiPaper-root > [data-cy=placeholder]').should('not.be.visible')
    });
});