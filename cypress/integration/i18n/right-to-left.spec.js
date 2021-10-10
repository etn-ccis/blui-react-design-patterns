/// <reference types="cypress" />


describe('R2L', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/i18n');
    });

    it('should display default page title', () => {
        cy.get('.MuiToolbar-root > .MuiTypography-root').should('contain', 'Internationalization');
    });

//     it('should display page title RTL', () => {
//         cy.get('[data-cy=change-language]').click()
//         cy.contains('Arabic').click()
//         cy.get('[data-cy=toolbar-title]').should('contain', 'تدويل')
//         .invoke('prop', 'offsetLeft').should('be.greaterThan', 629)
//         cy.get('[data-cy=R2L-menu]')
//         .invoke('prop', 'offsetLeft').should('be.lessThan', 5)
//     });

    it('should display R2L menu RTL', () => {
        cy.get('[data-cy=change-language]').click()
        cy.contains('Arabic').click()
        cy.get('[data-cy=R2L-menu]')
        .invoke('prop', 'offsetLeft').should('be.lessThan', 5)
    });

    it('should display language selector RTL', () => {
        cy.get('[data-cy=change-language]').click()
        cy.contains('Arabic').click()
        cy.get('[data-cy=change-language]')
        .invoke('prop', 'offsetLeft').should('be.greaterThan', 500)
    });

    it('should display item list RTL', () => {
        cy.get('[data-cy=change-language]').click()
        cy.contains('Arabic').click()
        cy.contains('موز')
        // cy.get('.makeStyles-root').first()
        .invoke('prop', 'offsetLeft').should('be.greaterThan', 10)
    });
});
