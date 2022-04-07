/// <reference types="cypress" />


describe('Form validation phone number', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/phone-number-format');
    });

    it('should display page title', () => {
        cy.get('[data-cy=blui-toolbar]')
        .should('contain', 'Phone Number Format');
    });

    it('should display error for each country', () => {
        cy.get('[data-cy=country-selector]').click()
        .should('contain', 'US')
        cy.get('.Mui-selected').click()
        cy.get('[data-cy=phone-input]').click()
        cy.get('body').click(top, {force: true})
        cy.contains('Please enter a valid U.S. phone number')
        cy.get('[data-cy=country-selector]').click()
        cy.get('.MuiPaper-root > .MuiList-root')
        .contains('CA').click()
        cy.get('[data-cy=phone-input]').click()
        cy.get('body').click(top, {force: true})
        cy.contains('Please enter a valid Canadian phone number')
        .should('contain', 'Please enter a valid Canadian phone number.')
        cy.get('[data-cy=country-selector]').click()
        cy.get('.MuiPaper-root > .MuiList-root')
        .contains('RU').click()
        cy.get('[data-cy=phone-input]').click()
        cy.get('body').click(top, {force: true})
        cy.contains('Please enter a valid Russian phone number')
        .should('contain', 'Please enter a valid Russian phone number.')
        cy.get('[data-cy=country-selector]').click()
        cy.get('.MuiPaper-root > .MuiList-root')
        .contains('EG').click()
        cy.get('[data-cy=phone-input]').click()
        cy.get('body').click(top, {force: true})
        cy.contains('Please enter a valid Egyptian phone number')
        .should('contain', 'Please enter a valid Egyptian phone number.')
        cy.get('[data-cy=country-selector]').click()
        cy.get('.MuiPaper-root > .MuiList-root')
        .contains('IN').click()
        cy.get('[data-cy=phone-input]').click()
        cy.get('body').click(top, {force: true})
        cy.contains('Please enter a valid Indian phone number')
        .should('contain', 'Please enter a valid Indian phone number.')
    });

    it('should display correct format placeholders', () => {
        cy.get('[data-cy=country-selector]')
        .should('contain', 'US')
        cy.get('[data-cy=phone-input]').click()
        cy.get('[data-cy=phone-input] > .MuiInputBase-root > .MuiInputBase-input')
        .invoke('prop','placeholder')
        .should('contain', '### ### ####')
        cy.get('[data-cy=country-selector]').click()
        cy.get('.MuiPaper-root > .MuiList-root').contains('CA').click()
        cy.get('[data-cy=phone-input] > .MuiInputBase-root > .MuiInputBase-input')
        .invoke('prop','placeholder')
        .should('contain', '### ### ####')
        cy.get('[data-cy=country-selector]').click()
        cy.get('.MuiPaper-root > .MuiList-root').contains('RU').click()
        cy.get('[data-cy=phone-input] > .MuiInputBase-root > .MuiInputBase-input')
        .invoke('prop','placeholder')
        .should('contain', '### ### ## ##')
        cy.get('[data-cy=country-selector]').click()
        cy.get('.MuiPaper-root > .MuiList-root').contains('EG').click()
        cy.get('[data-cy=phone-input] > .MuiInputBase-root > .MuiInputBase-input')
        .invoke('prop','placeholder')
        .should('contain', '# #######')
        cy.get('[data-cy=country-selector]').click()
        cy.get('.MuiPaper-root > .MuiList-root').contains('IN').click()
        cy.get('[data-cy=phone-input] > .MuiInputBase-root > .MuiInputBase-input')
        .invoke('prop','placeholder')
        .should('contain', '#### ### ###')
    });
});