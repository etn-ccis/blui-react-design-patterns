/// <reference types="cypress" />

describe('Page wide search', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/page-wide-search');
    });

    it('should display page title', () => {
        cy.get('[data-cy=toolbar]').should('contain', 'Page Wide Search');
    });

    it('should filter data when searching', () => {
        cy.get('.MuiInputBase-input').click().type('grape')
        cy.get('[data-cy=list-items]').should('contain', 'Grape').and('have.length', (1))
        cy.get('.MuiInputBase-input').clear()
        cy.get('.MuiInputBase-input').click().type('water')
        cy.get('[data-cy=list-items]').should('contain', 'Watermelon').and('have.length', (1))

    });

    it('should return no results when data does not exist', () => {
        cy.get('.MuiInputBase-input').click().type('123')
        cy.get('body').should('contain', 'No results.')

    });
});