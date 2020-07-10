/// <reference types="cypress" />

const { should } = require("chai");


describe('Functional complex bottom sheet', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/complex-bottom-sheet');
    });

    it('title displays', () => {
        cy.get('[data-cy=pxb-toolbar]').should('contain', 'Complex Bottom Sheet');
    });

    it('bottom sheet opens & action items display', () => {
        cy.get('[data-cy=action-menu]').click()
        cy.get('[data-cy=btm-sheet-sort]').should('contain', 'Sort By')
        .and('contain', 'Time')
        .and('contain', 'Type')
        cy.get('[data-cy=btm-sheet-show]').should('contain', 'Show')
        .and('contain', 'Active Alarms')
        .and('contain', 'alarms')
        .and('contain', 'settings')
        .and('contain', 'session')
        cy.get('[data-cy=btm-sheet-cancel]').should('contain', 'Close')
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