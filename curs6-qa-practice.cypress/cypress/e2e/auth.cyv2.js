const baseUrl = 'https://qa-practice.netlify.app' //SAU IN CYPRESS.CONFIG.JS AM DECLARAT BASE URLU


describe('template spec', () => {

    beforeEach(() => {
        cy.visit(baseUrl);
        cy.get("#auth-shop").click();
    })


    it('login', () => {
      cy.get("input#email").type("admin@admin.com");
      cy.get("input#password").type("admin123");
      cy.get('button[test-data="submitBtn"]').click();
      cy.get('li.lgout a').should('be.visible');
      cy.get('li.lgout a').should('contain', 'Log Out');

    });


    xit('login with invalid credentials', () => {
        cy.get("input#email").type("admin@admin.com");
        cy.get("input#password").type("a23wfrwfrwfwfwf");
        cy.get('button[test-data="submitBtn"]').click();
        cy.get('#message').should('contain', "Bad credentials! Please try again! Make sure that you've registered.");
        cy.contains("Bad credentials! Please try again! Make sure that you've registered."); // varianta mai rapida a ceea ce e mai sus. se uita in toate elementele din dom si
        //cauta numai textul ala
        cy.get('div').contains("Bad credentials! Please try again! Make sure that you've registered."); //se uita numai in divuri dupa textul ala 
  
    });
});