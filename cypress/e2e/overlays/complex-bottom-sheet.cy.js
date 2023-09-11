/// <reference types="cypress" />

const { should } = require("chai");


describe('Complex bottom sheet', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/complex-bottom-sheet');
    });

    it('should display page title', () => {
        cy.get('[data-cy=blui-toolbar]').should('contain', 'Complex Bottom Sheet');
    });

    it('should open overlay and action items display', () => {
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

    it('should display empty state', () => {
        cy.get('[data-cy=action-menu]').click()
        cy.get('[data-cy=active-alarms]').click()
        cy.get('[data-cy=alarms]').click()
        cy.get('[data-cy=settings]').click()
        cy.get('[data-cy=sessions]').click()
        cy.get('[data-cy=btm-sheet-cancel]').click()
        cy.get('[data-test=frame]').should('contain', 'No Events Available')
    });

    it('should dismiss overlay when page is selected', () => {
        cy.get('[data-cy=action-menu]').click()
        cy.get('[data-cy=btm-sheet-sort]').should('be.visible')
        cy.get('body').click(0,0);
        cy.get('[data-cy=btm-sheet-sort]').should('not.be.visible')
    });
});