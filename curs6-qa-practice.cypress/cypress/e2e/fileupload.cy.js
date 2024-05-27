//const baseUrl = 'https://qa-practice.netlify.app' //SAU IN CYPRESS.CONFIG.JS AM DECLARAT BASE URLU


describe('file upload test suite', () => {

    beforeEach(() => {
        cy.visit("/");
        cy.get("#file-upload-item").click();
    })


    it('file upload test', () => {

      const fileName = "example.json"
      cy.get('#file_upload').selectFile(`cypress/fixtures/${fileName}`)
      cy.get('button').contains("Submit").click()
      //cy.contains('Submit')
      cy.contains(`You have successfully uploaded "${fileName}"`).should('be.visible')
    });
});