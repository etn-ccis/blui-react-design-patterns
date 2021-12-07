/// <reference types="cypress" />


describe('Responsive table', () => {

    it('should display title and table header on desktop', () => {
        cy.viewport(1024, 635)
        cy.visit('localhost:3000/responsive-table')
        cy.get('[data-cy=blui-toolbar]').should('contain', 'Responsive Table')
        cy.get('.MuiTableHead-root').should('contain', 'Name').and('contain', 'Description')
        cy.get('[data-cy=toolbar-menu]').should('not.exist')
        


    });
    it('should display title and table header on tablet', () => {
        cy.viewport(768, 1024)
        cy.visit('localhost:3000/responsive-table')
        cy.get('[data-cy=blui-toolbar]').should('contain', 'Responsive Table')
        cy.get('.MuiTableHead-root').should('contain', 'Name').and('contain', 'Description')
        cy.get('[data-cy=toolbar-menu]').should('be.visible')
        


    });
    it('should display title and no table header on phone', () => {
        cy.viewport(375, 812)
        cy.visit('localhost:3000/responsive-table')
        cy.get('[data-cy=blui-toolbar]').should('contain', 'Responsive Table')
        cy.get('.MuiTableHead-root').should('not.exist')
        cy.get('[data-cy=toolbar-menu]').should('be.visible')


    });
});