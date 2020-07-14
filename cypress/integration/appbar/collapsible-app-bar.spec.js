/// <reference types="cypress" />


describe('Collapsible app bar', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/collapsible');
    });

    it('show tool bar and banner', () => {
        cy.get('#scroll-area > .MuiList-root').scrollIntoView({ duration: 1000, offset:{ top: 0, left: 0 }})
        cy.get('.MuiPaper-root > .MuiToolbar-root').should('be.visible')
        cy.get('.makeStyles-banner-340').scrollIntoView().should('be.visible')
    });
});