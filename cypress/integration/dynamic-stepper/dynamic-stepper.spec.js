/// <reference types="cypress" />


describe('Dynamic stepper', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/dynamic-stepper');
    });

    it('title displays', () => {
        cy.get('[data-cy=pxb-toolbar]').should('contain', 'Dynamic Stepper');
    });

    it('add steps', () => {
        cy.contains('Cook Dinner').click()
        cy.get('[data-cy=addstep]').click()
        cy.contains('Go To Work').click()
        cy.get('[data-cy=done]').click()
        cy.get('[data-cy="success msg"]').should('contain', 'Procedure created successfully.')
    });

    it('remove steps', () => {
        cy.contains('Cook Dinner').click()
        cy.get('[data-cy=addstep]').click()
        cy.contains('Go To Work').click()
        cy.contains('Go To Work').click()
        cy.get('[data-cy=remove-step]').click()
        cy.contains('Go To Work').should('not.be.visible')
        cy.contains('Cook Dinner').click()
        cy.get('[data-cy=remove-step]').click()
        
    });

    it('remove all steps', () => {
        cy.contains('Cook Dinner').click()
        cy.get('[data-cy=addstep]').click()
        cy.contains('Go To Work').click()
        cy.get('[data-cy="remove all"]').click()
        cy.get('[data-cy=reset-page]').should('contain', 'Add a Step').and('contain', 'Done')


    });

    it('reset demo', () => {
        cy.contains('Cook Dinner').click()
        cy.get('[data-cy=addstep]').click()
        cy.contains('Go To Work').click()
        cy.get('[data-cy=done]').click()
        cy.get('[data-cy="success msg"]').should('contain', 'Procedure created successfully.')
        cy.get('[data-cy=reset]').click()
        cy.get('[data-cy=reset-page]').should('contain', 'Add a Step')

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