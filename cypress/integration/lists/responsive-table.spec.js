/// <reference types="cypress" />


describe('Functional table view ports', () => {

    it('desktop view', () => {
        cy.viewport(1024, 635)
        cy.visit('localhost:3000/responsive-table')
        cy.get('[data-cy=pxb-toolbar]').should('contain', 'Responsive Table')
        cy.get('.MuiTableHead-root').should('contain', 'Name').and('contain', 'Description')
        cy.get('[data-cy=toolbar-menu]').should('not.be.visible')
        


    });
    it('tablet view', () => {
        cy.viewport(768, 1024)
        cy.visit('localhost:3000/responsive-table')
        cy.get('[data-cy=pxb-toolbar]').should('contain', 'Responsive Table')
        cy.get('.MuiTableHead-root').should('contain', 'Name').and('contain', 'Description')
        cy.get('[data-cy=toolbar-menu]').should('be.visible')
        


    });
    it('phone view', () => {
        cy.viewport(375, 812)
        cy.visit('localhost:3000/responsive-table')
        cy.get('[data-cy=pxb-toolbar]').should('contain', 'Responsive Table')
        cy.get('.MuiTableHead-root').should('not.contain', 'Name').and('not.contain', 'Description')
        cy.get('[data-cy=toolbar-menu]').should('be.visible')


    });
});