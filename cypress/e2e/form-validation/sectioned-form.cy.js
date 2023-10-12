/// <reference types="cypress" />

describe('Form validation sectioned form', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/in-a-sectioned-form');
    });

    it('should display page title', () => {
        cy.get('[data-cy=blui-toolbar]').should('contain', 'Sectioned Form');
    });

    it('should display required for fields on submit', () => {
        cy.get('#submit-button').click();
        cy.get('#name-field-helper-text').should('contain', 'Required');
        cy.get('#address-field-helper-text').should('contain', 'Required');
        cy.get('#city-field-helper-text').should('contain', 'Required');
        cy.get('#state-field .MuiFormHelperText-root.Mui-error').should('contain', 'Required');
        cy.get('#zip-field-helper-text').should('contain', 'Required');
        cy.get('#first-name-field-helper-text').should('contain', 'Required');
        cy.get('#email-field-helper-text').should('contain', 'Required');
    });

    it('should display not required for fields after refresh', () => {
        cy.get('#submit-button').click();
        cy.get('#address-field-helper-text').should('contain', 'Required');
        cy.reload();
        cy.get('#address-field-helper-text').should('not.exist');
    });

    it('should display factory name char count 15/50', () => {
        cy.get('#name-field').click().type('Enter some text');
        cy.get('#name-field-helper-text').should('contain', '15/50');
    });

    it('should display error invalid email', () => {
        cy.get('#email-field').type('admin');
        cy.get('#submit-button').click();
        cy.get('#email-field-helper-text').should('contain', 'Please enter a valid email address');
    });
});
