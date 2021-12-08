/// <reference types="cypress" />


describe('Dynamic stepper', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/dynamic-stepper');
    });

    it('should display page title', () => {
        cy.get('[data-cy=blui-toolbar]').should('contain', 'Dynamic Stepper');
    });

    it('should add steps to stepper when add is cllicked', () => {
        cy.contains('Cook Dinner').click()
        cy.get('[data-cy=addstep]').click()
        cy.contains('Go To Work').click()
        cy.get('[data-cy=done]').click()
        cy.get('[data-cy="success msg"]').should('contain', 'Procedure created successfully.')
    });

    it('should remove steps from stepper when step remove clicked', () => {
        cy.contains('Cook Dinner').click()
        cy.get('[data-cy=addstep]').click()
        cy.contains('Go To Work').click()
        cy.contains('Go To Work').click()
        cy.get('[data-cy=remove-step]').click()
        cy.contains('Go To Work').should('not.exist')
        cy.contains('Cook Dinner').click()
        cy.get('[data-cy=remove-step]').click()
        
    });

    it('should remove all steps from stepper', () => {
        cy.contains('Cook Dinner').click()
        cy.get('[data-cy=addstep]').click()
        cy.contains('Go To Work').click()
        cy.get('[data-cy="remove all"]').click()
        cy.get('[data-cy=reset-page]').should('contain', 'Add a Step').and('contain', 'Done')


    });

    it('should reset the demo when reset is clicked', () => {
        cy.contains('Cook Dinner').click()
        cy.get('[data-cy=addstep]').click()
        cy.contains('Go To Work').click()
        cy.get('[data-cy=done]').click()
        cy.get('[data-cy="success msg"]').should('contain', 'Procedure created successfully.')
        cy.get('[data-cy=reset]').click()
        cy.get('[data-cy=reset-page]').should('contain', 'Add a Step')

    });
});