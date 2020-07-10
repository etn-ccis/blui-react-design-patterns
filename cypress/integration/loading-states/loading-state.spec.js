/// <reference types="cypress" />


describe('Functional loading states', () => {
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