/// <reference types="cypress" />


describe('Search bar', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/search');
    });

    it('title displays', () => {
        cy.get('[data-cy=pxb-toolbar]').should('contain', 'Search');
    });

    it('search filters data', () => {
        cy.get('[data-cy=search-btn]').click()
        cy.get('[data-cy=searchfield]').type('bill clinton')
        cy.get('[data-cy=list-view]').should('contain', 'Bill Clinton').and('have.length', (1))
        cy.get('[data-cy=search-close-btn]').click()
        cy.get('[data-cy=search-btn]').click()
        cy.get('[data-cy=searchfield]').type('ron')
        cy.get('[data-cy=list-view]').should('contain', 'Ronald Reagan').and('have.length', (1))
        cy.get('[data-cy=search-close-btn]').click()

    });

    it('search with no results', () => {
        cy.get('[data-cy=search-btn]').click()
        cy.get('[data-cy=searchfield]').type('123')
        cy.get('[data-cy=list-view]').should('contain', 'No matching presidents')
        cy.get('[data-cy=search-close-btn]').click()

    });
});