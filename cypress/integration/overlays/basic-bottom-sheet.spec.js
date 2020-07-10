/// <reference types="cypress" />


describe('Functional basic bottom sheet', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/basic-bottom-sheet');
    });

    it('title displays', () => {
        cy.get('[data-cy=pxb-toolbar]').should('contain', 'Basic Bottom Sheet');
    });

    it('bottom sheet opens & action items', () => {
        cy.get('[data-cy=toolbar-action-menu]').click()
        cy.get('[data-cy=ack]').should('contain', 'Acknowledge All')
        cy.get('[data-cy=export]').should('contain', 'Export')
        cy.get('[data-cy=cancel]').should('contain', 'Cancel')
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