/// <reference types="cypress" />


describe('Functional i18n', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/i18n');
    });

    it('title displays', () => {
        cy.get('.MuiToolbar-root > .MuiTypography-root').should('contain', 'Internationalization');
    });

    it('language dropdown', () => {
        cy.get('.MuiSelect-root').click()
        cy.get('.MuiPaper-root > .MuiList-root').should('contain', 'English')
        .should('contain', 'Spanish')
        .should('contain', 'German')
        .should('contain', 'Arabic')
        .should('contain', 'French')
        .should('contain', 'Portuguese')
        .should('contain', 'Chinese')
    });

    it('item list displays english', () => {
        cy.get('#item-list').should('contain', 'Apple')
    });

    it('item list displays spanish', () => {
        cy.get('.MuiSelect-root').click()
        cy.contains('Spanish').click()
        cy.get('#item-list').should('contain', 'Manzana')
    });

    it('item list displays german', () => {
        cy.get('.MuiSelect-root').click()
        cy.contains('German').click()
        cy.get('#item-list').should('contain', 'Apfel')
    });

    it('item list displays arabic', () => {
        cy.get('.MuiSelect-root').click()
        cy.contains('Arabic').click()
        cy.get('#item-list').should('contain', 'تفاحة')
    });

    it('item list displays french', () => {
        cy.get('.MuiSelect-root').click()
        cy.contains('French').click()
        cy.get('#item-list').should('contain', 'Pomme')
    });

    it('item list displays portuguese', () => {
        cy.get('.MuiSelect-root').click()
        cy.contains('Portuguese').click()
        cy.get('#item-list').should('contain', 'Maçã')
    });

    it('item list displays chinese', () => {
        cy.get('.MuiSelect-root').click()
        cy.contains('Chinese').click()
        cy.get('#item-list').should('contain', '苹果')
    });

    it('TODO test RTL', () => {
        
    });
});