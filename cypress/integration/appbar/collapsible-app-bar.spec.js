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

    it('toolbar menu not displayed desktop view', () => {
        cy.viewport(1024, 635)
        cy.get('[data-cy=toolbar-menu]').should('not.be.visible')         
    });

    it('toolbar menu displays tablet view', () => {
        cy.viewport(768, 1024)
        cy.get('[data-cy=toolbar-menu]').should('be.visible')
    });

    it('toolbar menu displays phone view', () => {
        cy.viewport(375, 812)
        cy.get('[data-cy=toolbar-menu]').should('be.visible')
        
    });
});