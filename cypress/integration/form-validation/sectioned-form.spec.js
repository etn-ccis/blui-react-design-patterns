/// <reference types="cypress" />


describe('Form validation', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/in-a-sectioned-form');
    });

    it('should display page title', () => {
        cy.get('[data-cy=pxb-toolbar]').should('contain', 'Sectioned Form');
    });

    it('should display required for fields on submit color #ca3c3d', () => {
        cy.get('[data-cy=submit]').click()
        cy.get('#name-field-helper-text')
        .should('contain', 'Required')
        .invoke('css', 'color').should('equal', 'rgb(202, 60, 61)')
        cy.get('#address-field-helper-text')
        .should('contain', 'Required')
        .invoke('css', 'color').should('equal', 'rgb(202, 60, 61)')
        cy.get('#city-field-helper-text')
        .should('contain', 'Required')
        .invoke('css', 'color').should('equal', 'rgb(202, 60, 61)')
        cy.get('.MuiFormControl-fullWidth > .MuiFormHelperText-root')
        .should('contain', 'Required')
        .invoke('css', 'color').should('equal', 'rgb(202, 60, 61)')
        cy.get('#zip-field-helper-text')
        .should('contain', 'Required')
        .invoke('css', 'color').should('equal', 'rgb(202, 60, 61)')
        cy.get('#first-name-field-helper-text')
        .should('contain', 'Required')
        .invoke('css', 'color').should('equal', 'rgb(202, 60, 61)')
        /cy.get('#email-field-helper-text')
        .should('contain', 'Required')
        .invoke('css', 'color').should('equal', 'rgb(202, 60, 61)')
    });

    it('should display not required for fields after refresh', () => {
        cy.get('[data-cy=submit]').click()
        cy.get('#address-field-helper-text')
        .should('contain', 'Required')
        .invoke('css', 'color').should('equal', 'rgb(202, 60, 61)')
        cy.reload()
        cy.get('#address-field-helper-text').should('not.exist')
    });

    it('should display factory name char count 15/50', () => {
        cy.get('#name-field').click().type('Enter some text')
        cy.get('#name-field-helper-text').should('contain', '15/50')
    });

    it('should display error invalid email', () => {
        cy.get('#email-field').type('admin')
        cy.get('[data-cy=submit]').click()
        cy.get('#email-field-helper-text').should('contain', 'Please enter a valid email address')
    });
});