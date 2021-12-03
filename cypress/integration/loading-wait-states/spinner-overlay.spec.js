/// <reference types="cypress" />


describe('Loading states', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/spinner-overlays');
    });

    it('should display page title', () => {
        cy.get('[data-cy=blui-toolbar]').should('contain', 'Spinner Overlays')
    });

    it('Should trigger spinner loading overlay on reload ', () => {
        cy.get('[data-cy=reload]').click({force: true})
        cy.get('.MuiCircularProgress-svg').should('be.visible')
    });
});