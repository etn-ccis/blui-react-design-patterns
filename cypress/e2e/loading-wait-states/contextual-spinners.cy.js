/// <reference types="cypress" />


describe('Loading contextual spinner', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/contextual-spinner');
    });

    it('should display page title', () => {
        cy.get('[data-cy=blui-toolbar]').should('contain', 'Contextual Spinner')
    });

    it('Should trigger spinner loading overlay on login button ', () => {
        cy.get('[data-cy=login-btn]').click()
        cy.get('.MuiCircularProgress-svg').should('be.visible')
    });
    it('Should trigger spinner loading overlay on start fab button ', () => {
        cy.get('[data-cy=start-btn]').click()
        cy.get('.MuiCircularProgress-svg').should('be.visible')
    });
});