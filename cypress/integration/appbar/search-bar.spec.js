/// <reference types="cypress" />


describe('Functional test search bar', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/search');
    });

    it('title displays', () => {
        cy.get('[data-cy=pxb-toolbar]').should('contain', 'Search');
    });

    it('search filters data', () => {
        cy.get('[data-cy=search-btn]').click()
        cy.get('[data-cy=searchfield]').type('bill clinton')
        cy.get('[data-cy=list-view]').should('contain', 'Bill Clinton')
        cy.get('[data-cy=search-close-btn]').click()
        cy.get('[data-cy=search-btn]').click()
        cy.get('[data-cy=searchfield]').type('ron')
        cy.get('[data-cy=list-view]').should('contain', 'Ronald Reagan')
        cy.get('[data-cy=search-close-btn]').click()

    });

    it('search with no results', () => {
        cy.get('[data-cy=search-btn]').click()
        cy.get('[data-cy=searchfield]').type('123')
        cy.get('[data-cy=list-view]').should('contain', 'No matching presidents')
        cy.get('[data-cy=search-close-btn]').click()

    });

    it('toolbar menu not displayed desktop view', () => {
        cy.viewport(1024, 635)
        cy.get('[data-cy=toolbar-menu]').should('not.be.visible')         
    });

    it('toolbar menu displays tablet view', () => {
        cy.viewport(768, 1024)
        cy.get('[data-cy=toolbar-menu]').should('be.visible')
    });

    it('toolbar menu displays phone view', () => {
        cy.viewport(375, 812)
        cy.get('[data-cy=toolbar-menu]').should('be.visible')
        
    });
});