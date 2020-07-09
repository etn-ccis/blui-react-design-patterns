/// <reference types="cypress" />

// todo add data-test=id to info list items
describe('Functional status list loads & tag', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/status-list');
    });

    it('title displays', () => {
        cy.get('[data-cy=pxb-toolbar]').should('contain', 'Status List');
    });

    it('status tags load', () => {
        cy.get('[data-test=list-item-tag]').should('be.visible').and('have.css', 'background-color', 'rgb(202, 60, 61)')

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