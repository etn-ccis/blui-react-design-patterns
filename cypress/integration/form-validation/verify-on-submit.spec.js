/// <reference types="cypress" />

describe('Form validation verify on submit', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/verify-on-submit');
    });

    it('should display page title', () => {
        cy.get('[data-cy=blui-toolbar]').should('contain', 'Verify on Submit');
    });

    it('should display input field as focused by default', () => {
        cy.get('#serial-number').should('have.focus');
    });

    it('should display search button disabled', () => {
        cy.get('[data-cy=search-button]').should('be.disabled');
    });

    it('should display search button enabled', () => {
        cy.get('#serial-number').type('111');
        cy.get('[data-cy=search-button]').should('be.enabled');
    });

    it('should display spinner on search', () => {
        cy.get('#serial-number').type('111');
        cy.get('[data-cy=search-button]').click();
        cy.get('.MuiCircularProgress-svg').should('be.visible');
    });

    it('should display error message', () => {
        cy.get('#serial-number').type('111');
        cy.get('[data-cy=search-button]').click();
        cy.get('#serial-number-helper-text').should('contain', 'Device not found.');
    });

    it('should display success on valid search', () => {
        cy.get('#serial-number').type('123');
        cy.get('[data-cy=search-button]').click();
        cy.get('[data-test=frame]').should('contain', 'Success');
    });

    it('should display search when add device is selected', () => {
        cy.get('#serial-number').type('123');
        cy.get('[data-cy=search-button]').click();
        cy.get('[data-cy=add-device]').click();
        cy.get('#serial-number').should('have.focus');
    });
});
