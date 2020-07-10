/// <reference types="cypress" />


describe('Functional form validations', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/form-validation');
    });

    it('title displays', () => {
        cy.get('[data-cy=pxb-toolbar]').should('contain', 'Form Validation');
    });

    it('basic form error states', () => {
        cy.get('#input').click()
        cy.get('#email').click()
        cy.get('#phoneNumber').click()
        cy.get('#input').click()
        cy.get('#input-helper-text').should('contain', 'required')
        cy.get('#email-helper-text').should('contain', 'required')
        cy.get('#phoneNumber-helper-text').should('contain', 'required')
    });

    it('basic form invalid entry', () => {
        cy.get('#input').click().type('info')
        cy.get('#input-helper-text').should('contain', 'This is a regular input field')
        cy.get('#email').click().type('admin@admin.n')
        cy.get('#phoneNumber').click()
        cy.get('#email-helper-text').should('contain', 'Invalid email address')
        cy.get('#phoneNumber').click().type('123-123-123')
        cy.get('#input').click()
        cy.get('#phoneNumber-helper-text').should('contain', 'Invalid phone number')
    });

    it('basic form valid entry', () => {
        cy.get('#input').click().type('info')
        cy.get('#input-helper-text').should('contain', 'This is a regular input field')
        cy.get('#email').click().type('admin@admin.net')
        cy.get('#phoneNumber').click()
        cy.get('#email-helper-text').should('contain', 'This field throws an error if the email format is incorrect')
        cy.get('#phoneNumber').click().type('123-123-1231')
        cy.get('#input').click()
        cy.get('#phoneNumber-helper-text').should('contain', 'This field throws an error if the phone number format is incorrect. (Needs to be a valid U.S. number)')
    });

    it('character limit entry', () => {
        cy.get('#chars').click().type('Enter some text')
        cy.get('#chars-helper-text').should('contain', '15/30')
        cy.get('#chars').click().type('Enter some text')
        cy.get('#chars-helper-text').should('contain', '30/30')
    });

    it('password error states', () => {
        //TODO- need a way to find change on all 5 requirements

    });

    it('toolbar menu not displayed desktop view', () => {
        cy.viewport(1024, 635)
        cy.get('[data-cy=toolbar-menu]').should('not.be.visible')         
    });

    it('toolbar menu displays tablet view', () => {
        cy.viewport(768, 1024)
        cy.get('[data-cy=toolbar-menu]').should('be.visible')
    });

    it('toolbar menu displays phone view', () => {
        cy.viewport(375, 812)
        cy.get('[data-cy=toolbar-menu]').should('be.visible')
        
    })

});