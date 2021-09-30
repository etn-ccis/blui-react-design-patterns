/// <reference types="cypress" />

describe('Search bar', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/search');
    });

    it('should display page title', () => {
        cy.get('[data-cy=pxb-toolbar]').should('contain', 'Search');
    });

    // it('should filter data when searching', () => {
    //     cy.get('[data-cy=search-btn]').click()
    //     cy.get('#search-field').type('bill clinton')
    //     cy.get('[data-cy=list-view]').should('contain', 'Bill Clinton').and('have.length', (1))
    //     cy.get('[data-cy=search-close-btn]').click()
    //     cy.get('[data-cy=search-btn]').click()
    //     cy.get('#search-field').type('ron')
    //     cy.get('[data-cy=list-view]').should('contain', 'Ronald Reagan').and('have.length', (1))
    //     cy.get('[data-cy=search-close-btn]').click()
    // });

    // it('should return no results when data does not exist', () => {
    //     cy.get('[data-cy=search-btn]').click()
    //     cy.get('#search-field').type('123')
    //     cy.get('[data-test=frame]').should('contain', 'No matching presidents')
    //     cy.get('[data-cy=search-close-btn]').click()
    // });
});
