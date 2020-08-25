/// <reference types="cypress" />


describe('Sortable list', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/sortable-list');
    });

    it('should display page title', () => {
        cy.get('[data-cy=pxb-toolbar]').should('contain', 'Sortable List');
    });

    it('should drag item in list', () => {
      cy.get('[data-cy=edit-save]').click()
      cy.get('.makeStyles-root-440 > .MuiListItemIcon-root > .MuiSvgIcon-root')
      .trigger('mousedown', { which: 1 })
      .trigger('mousemove', { force: true, x: 0, y: 100 })
      .trigger('mouseup', { force: true })

    });
});