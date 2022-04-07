/// <reference types="cypress" />


describe('Toolbar menu', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/toolbar-menu');
    });

    it('should display title and subtitle', () => {
        cy.get('[data-cy=blui-toolbar]').should('contain', 'Title');
    });

    it('should display correct subtitle on selected', () => {
        cy.contains('Subtitle').click()
        cy.contains('All Locations').click()
    });
});