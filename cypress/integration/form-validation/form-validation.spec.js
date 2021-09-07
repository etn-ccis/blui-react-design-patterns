// /// <reference types="cypress" />


// describe('Form validation', () => {
//     beforeEach(() => {
//         cy.visit('http://localhost:3000/form-validation');
//     });

//     it('should display page title', () => {
//         cy.get('[data-cy=pxb-toolbar]').should('contain', 'Form Validation');
//     });

//     it('should display error states', () => {
//         cy.get('#input').click()
//         cy.get('#email').click()
//         cy.get('#phoneNumber').click()
//         cy.get('#input').click()
//         cy.get('#input-helper-text').should('contain', 'required')
//         cy.get('#email-helper-text').should('contain', 'required')
//         cy.get('#phoneNumber-helper-text').should('contain', 'required')
//     });

//     it('should display invalid entry on fields', () => {
//         cy.get('#input').click().type('info')
//         cy.get('#input-helper-text').should('contain', 'This is a regular input field')
//         cy.get('#email').click().type('admin@admin.n')
//         cy.get('#phoneNumber').click()
//         cy.get('#email-helper-text').should('contain', 'Invalid email address')
//         cy.get('#phoneNumber').click().type('123-123-123')
//         cy.get('#input').click()
//         cy.get('#phoneNumber-helper-text').should('contain', 'Invalid phone number')
//     });

//     it('should accept valid entry', () => {
//         cy.get('#input').click().type('info')
//         cy.get('#input-helper-text').should('contain', 'This is a regular input field')
//         cy.get('#email').click().type('admin@admin.net')
//         cy.get('#phoneNumber').click()
//         cy.get('#email-helper-text').should('contain', 'This field throws an error if the email format is incorrect')
//         cy.get('#phoneNumber').click().type('123-123-1231')
//         cy.get('#input').click()
//         cy.get('#phoneNumber-helper-text').should('contain', 'This field throws an error if the phone number format is incorrect. (Needs to be a valid U.S. number)')
//     });

//     it('should display character count 15/30', () => {
//         cy.get('#chars').click().type('Enter some text')
//         cy.get('#chars-helper-text').should('contain', '15/30')
//     });

//     it('should display character count 30/30', () => {
//         cy.get('#chars').click().type('Enter some text')
//         cy.get('#chars-helper-text').should('contain', '15/30')
//         cy.get('#chars').click().type('Enter some text')
//         cy.get('#chars-helper-text').should('contain', '30/30')
//         cy.get('#chars').click().type('Enter some addtional text')
//         cy.get('#chars-helper-text').should('contain', '30/30')
//     });

//     it('should display character count 30/30 when 45 entered', () => {
//         cy.get('#chars').click().type('Enter some text')
//         cy.get('#chars-helper-text').should('contain', '15/30')
//         cy.get('#chars').click().type('Enter some text')
//         cy.get('#chars-helper-text').should('contain', '30/30')
//         cy.get('#chars').click().type('Enter more text')
//         cy.get('#chars-helper-text').should('contain', '30/30')
//     });

//     //it('password error states', () => {
//         //TODO- need a way to find change on all 5 requirements

//     });