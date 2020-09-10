/// <reference types="cypress" />

const { should } = require("chai");


describe('Complex bottom sheet', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/complex-bottom-sheet');
    });

    it('should display page title', () => {
        cy.get('[data-cy=pxb-toolbar]').should('contain', 'Complex Bottom Sheet');
    });

    it('should open and action items display', () => {
        cy.get('[data-cy=action-menu]').click()
        cy.get('[data-cy=btm-sheet-sort]').should('contain', 'Sort By')
        .and('contain', 'Time')
        .and('contain', 'Type')
        cy.get('[data-cy=btm-sheet-show]').should('contain', 'Show')
        .and('contain', 'Active Alarms')
        .and('contain', 'Alarms')
        .and('contain', 'Settings')
        .and('contain', 'Session')
        cy.get('[data-cy=btm-sheet-cancel]').should('contain', 'Close')
    });

    it('should dismiss when page is selected', () => {
        cy.get('[data-cy=action-menu]').click()
        cy.get('[data-cy=btm-sheet-sort]').should('be.visible')
        cy.get('body').click()
        cy.get('[data-cy=btm-sheet-sort]').should('not.be.visible')
    });
});
