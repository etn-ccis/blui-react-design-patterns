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