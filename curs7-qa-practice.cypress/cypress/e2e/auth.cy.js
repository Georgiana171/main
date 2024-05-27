import HeaderMenuPage from "../pages/HeaderMenuPage";
import LeftSideMenuPage from "../pages/LeftSideMenuPage";
import LoginPage from "../pages/LoginPage";
import { faker } from '@faker-js/faker';

describe('Auth test suite', () => {
  beforeEach(() => {
      cy.visit("/");
      LeftSideMenuPage.getShopEcommerceLink().click();
  })

  it('login test', () => {
      //cy.doLogin("admin@admin.com","admin123");   -> we can use this custom command or we can use the above from folder pages
      LoginPage.doLoginFromPOM("admin@admin.com","admin123");
      HeaderMenuPage.getLogoutBtn().should('be.visible');
      HeaderMenuPage.getLogoutBtn().should('contain', 'Log Out');
  });

   // it.skip == xit -> this is for skipping the it block
  it('try login test with invalid creds', () => {
    const randomPsw = faker.lorem.word();
    
      cy.doLogin("admin@admin.com",randomPsw);

      LoginPage.getErrorMsg().should('contain', "Bad credentials! Please try again! Make sure that you've registered.");
      cy.contains("Bad credentials! Please try again! Make sure that you've registered.").should('be.visible');
      cy.get('div').contains("Bad credentials! Please try again! Make sure that you've registered.").should('be.visible');
  });
});