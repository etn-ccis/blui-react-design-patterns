/// <reference types="cypress" />


describe('Form validation', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/verify-on-submit');
    });

    it('should display page title', () => {
        cy.get('[data-cy=pxb-toolbar]').should('contain', 'Verify on Submit');
    });

    it('should display input field as focused by default', () => {
        cy.get('#serialNumber').should('have.focus')
    });

    it('should display search button disabled', () => {
        cy.get('[data-cy=search-button]').should('be.disabled')
    });

    it('should display search button enabled', () => {
        cy.get('#serialNumber').type('111')
        cy.get('[data-cy=search-button]').should('be.enabled')
    });

    it('should display spinner on search', () => {
        cy.get('#serialNumber').type('111')
        cy.get('[data-cy=search-button]').click()
        cy.get('.MuiCircularProgress-svg').should('be.visible')
    });

    it('should display error message', () => {
        cy.get('#serialNumber').type('111')
        cy.get('[data-cy=search-button]').click()
        cy.get('#serialNumber-helper-text').should('contain', 'Device not found.')
    });

    it('should display error in correct color #ca3c3d', () => {
        cy.get('#serialNumber').type('111')
        cy.get('[data-cy=search-button]').click()
        cy.get('#serialNumber-helper-text')
        .invoke('css', 'color').should('equal', 'rgb(202, 60, 61)')
    });

    it('should display success on valid search', () => {
        cy.get('#serialNumber').type('123')
        cy.get('[data-cy=search-button]').click()
        cy.get('[data-test=frame]').should('contain', 'Success')
    });

    it('should display search when add device is selected', () => {
        cy.get('#serialNumber').type('123')
        cy.get('[data-cy=search-button]').click()
        cy.get('[data-cy=add-device]').click()
        cy.get('#serialNumber').should('have.focus')
    });
});