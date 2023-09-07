/// <reference types="cypress" />

describe('Collapsible app bar', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/collapsible');
    });

    it.skip('should display toolbar height 154', () => {
        cy.get('[data-cy=toolbar]').should('be.visible').invoke('prop', 'scrollHeight').should('eq', 154);
    });

    it.skip('should display toolbar height 64 on scroll', () => {
        cy.get('#page-body').scrollIntoView({ duration: 1000, offset: { top: 0, left: 0 } });
        cy.get('[data-cy=toolbar]')
            .should('be.visible')
            .should('contain.text', 'Gary Steel Works')
            .invoke('prop', 'scrollHeight')
            .should('eq', 64);
    });
});
