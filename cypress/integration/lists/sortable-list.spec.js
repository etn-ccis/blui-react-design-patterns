/// <reference types="cypress" />


describe('Sortable list', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/sortable-list');
    });

    it('should display page title', () => {
        cy.get('[data-cy=pxb-toolbar]').should('contain', 'Sortable List');
    });

    it('should enable sortable list items on edit', () => {
        cy.get('[data-cy=edit-save]').click()
        cy.get('[data-cy=sortable-row-0]').should('be.visible')
  
      });

    it('should drag item in list to location', () => {
      cy.get('[data-cy=edit-save]').click()
      cy.get('[data-cy=sortable-row-0] > .MuiListItemIcon-root')
      .trigger('mousedown', { which: 1 })
      .trigger('mousemove', { force: true, x: 0, y: 100 })
      .trigger('mouseup', { force: true })
      cy.get('[data-cy=sortable-row-1]').should('contain', '1789')
      cy.get('[data-cy=edit-save]').click()

    });
});