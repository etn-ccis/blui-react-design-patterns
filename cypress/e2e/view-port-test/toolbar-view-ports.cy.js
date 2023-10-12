/// <reference types="cypress" />

const sizes = ['iphone-6', 'ipad-2'];
const urls = ['http://localhost:3000/collapsible', 'http://localhost:3000/search',
'http://localhost:3000/in-a-list', 'http://localhost:3000/fixed-length-passcode', 'http://localhost:3000/in-a-table',
'http://localhost:3000/in-a-sectioned-form', 'http://localhost:3000/phone-number-format', 'http://localhost:3000/verify-on-submit',  
'http://localhost:3000/i18n', 'http://localhost:3000/action-list', 'http://localhost:3000/data-list', 
'http://localhost:3000/multiselect-list', 'http://localhost:3000/sortable-list', 'http://localhost:3000/status-list', 
'http://localhost:3000/responsive-table', 'http://localhost:3000/basic-bottom-sheet',
'http://localhost:3000/complex-bottom-sheet', 'http://localhost:3000/dynamic-stepper'];

describe('Hidden toolbar menu displays on small devices', () => {
    urls.forEach(url => {
    describe(`url: ${url}`, () => {
    sizes.forEach(size => {
    it(`should display menu icon ${url}`, () => {
    cy.visit(url);
    cy.viewport(size);
    cy.get('[data-cy=toolbar-menu]')
    .should('be.visible')
    });
    });
    });
    });
    });