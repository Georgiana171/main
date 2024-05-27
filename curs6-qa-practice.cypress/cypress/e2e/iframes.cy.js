///<reference types="cypress-iframes" 

describe('iframes test suite', () => {

    beforeEach(() => {
        cy.visit("/");
        cy.get("#iframes").click();
    })


    it('iframes test', () => {
        cy.frameLoaded("#iframe-checkboxes");
        cy.iframe().find("#learn-more").click();
        cy.iframe().find("#show-text").contains('This text appears when you click the "Learn more" button').should('be.visible')
    });
});