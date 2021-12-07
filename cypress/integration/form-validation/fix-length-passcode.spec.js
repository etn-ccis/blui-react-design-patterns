/// <reference types="cypress" />

describe('Form validation fix length passcode', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/fixed-length-passcode');
    });

    it('should display page title', () => {
        cy.get('[data-cy=blui-toolbar]').should('contain', 'Fixed Length Passcode');
    });

    it('should display incorrect passcode error', () => {
        cy.get('#passcode-input').type('789789');
        cy.get('#passcode-input-helper-text').should('contain', 'Incorrect Passcode');
    });

    it('should dismiss passcode error on edit', () => {
        cy.get('#passcode-input').type('789789');
        cy.get('#passcode-input-helper-text').should('contain', 'Incorrect Passcode');
        cy.get('#passcode-input').click().type(' {backspace} ');
        cy.get('[data-cy=passcode-error]').should('not.exist');
    });

    it('should display six-digit passcode error on blur', () => {
        cy.get('#passcode-input').type('78978').blur();
        cy.get('#passcode-input-helper-text').should('contain', 'Please enter a six-digit passcode.');
    });

    it('should reset the form', () => {
        cy.get('#passcode-input').type('78978').blur();
        cy.get('[data-cy=reset]').click();
        cy.get('#passcode-input-helper-text').should('not.exist');
    });

    it('should only allow numeric values', () => {
        cy.get('#passcode-input').type('test').blur();
        cy.get('#passcode-input').should('be.empty');
    });

    it('should display spinner with correct passcode', () => {
        cy.get('#passcode-input').type('123456');
        cy.get('[data-cy=loading-spinner]').should('be.visible');
    });

    it('should display success with correct passcode', () => {
        cy.get('#passcode-input').type('123456');
        cy.get('[data-cy=success]').should('be.visible');
    });
});
