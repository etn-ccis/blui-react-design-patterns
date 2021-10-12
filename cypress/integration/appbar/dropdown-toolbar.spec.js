/// <reference types="cypress" />


describe('Dropdown toolbar', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/dropdown-toolbar');
    });

    it('should display title and subtitle', () => {
        cy.get('[data-cy=toolbar]').should('contain', 'Title');
    });

    it('should display correct subtitle on selected', () => {
        cy.contains('Subtitle').click()
        cy.contains('All Locations').click()
        cy.get('[data-cy=toolbar]').should('contain', 'All Locations')
    });
});