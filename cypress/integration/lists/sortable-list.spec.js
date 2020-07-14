/// <reference types="cypress" />


describe('Sortable list', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/sortable-list');
    });

    it('title displays', () => {
        cy.get('[data-cy=pxb-toolbar]').should('contain', 'Sortable List');
    });

 //   it('TODO: edit list', () => {
 //       cy.get('[data-cy=edit-save]').click()
    });