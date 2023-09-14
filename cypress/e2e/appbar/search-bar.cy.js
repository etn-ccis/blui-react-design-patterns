/// <reference types="cypress" />

describe('Search bar', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/search');
    });

    it('should display page title', () => {
        cy.get('[data-cy=blui-toolbar]').should('contain', 'Search Bar');
    });

    it('should filter data when searching', () => {
        cy.get('[data-cy=search-btn]').click()
        cy.get('[data-cy=search-field').type('grape')
        cy.get('[data-cy=list-view] > .MuiListItem-root').should('contain', 'Grape').and('have.length', (1))
        cy.get('[data-cy="clear-search-field"]').click()
        cy.get('[data-cy=search-field').type('water')
        cy.get('[data-cy=list-view] > .MuiListItem-root').should('contain', 'Watermelon').and('have.length', (1))
    });

    it('should return no results when data does not exist', () => {
        cy.get('[data-cy=search-btn]').click()
        cy.get('[data-cy=search-field').type('123')
        cy.get('body').should('contain', 'No Results')
    });
});
