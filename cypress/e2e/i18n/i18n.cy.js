/// <reference types="cypress" />


describe('i18n international', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/i18n');
    });

    it('should display page title', () => {
        cy.get('.MuiToolbar-root > .MuiTypography-root').should('contain', 'Internationalization');
    });

    it('should display language in dropdown', () => {
        cy.get('[data-cy=change-language]').click()
        cy.get('.MuiPaper-root > .MuiList-root').should('contain', 'English')
        .should('contain', 'Arabic')
        .should('contain', 'Chinese')
        .should('contain', 'French')
        .should('contain', 'German')
        .should('contain', 'Portuguese')
        .should('contain', 'Spanish')
    });

    it('should display list items in english', () => {
        cy.get('#item-list').should('contain', 'Apple')
    });

    it('should display list items in spanish', () => {
        cy.get('[data-cy=change-language]').click()
        cy.contains('Spanish').click()
        cy.get('#item-list').should('contain', 'Manzana')
    });

    it('should display list items in german', () => {
        cy.get('[data-cy=change-language]').click()
        cy.contains('German').click()
        cy.get('#item-list').should('contain', 'Apfel')
    });

    it('should display list items in arabic', () => {
        cy.get('[data-cy=change-language]').click()
        cy.contains('Arabic').click()
        cy.get('#item-list').should('contain', 'تفاحة')
    });

    it('should display list items in french', () => {
        cy.get('[data-cy=change-language]').click()
        cy.contains('French').click()
        cy.get('#item-list').should('contain', 'Pomme')
    });

    it('should display list items in portuguese', () => {
        cy.get('[data-cy=change-language]').click()
        cy.contains('Portuguese').click()
        cy.get('#item-list').should('contain', 'Maçã')
    });

    it('should display list items in chinese', () => {
        cy.get('[data-cy=change-language]').click()
        cy.contains('Chinese').click()
        cy.get('#item-list').should('contain', '苹果')
    });
});