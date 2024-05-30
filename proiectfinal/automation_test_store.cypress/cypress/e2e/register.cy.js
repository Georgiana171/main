/// <reference types="cypress" />
const { faker } = require('@faker-js/faker');
import HeaderMenuPage from "../pages/HeaderMenuPage";
import RegisterPage from "../pages/RegisterPage";

describe('example to-do app', () => {
  const password = faker.internet.password();
  const loginName = faker.internet.userName();
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email();
  const address1 = faker.location.streetAddress();
  const city = faker.location.city();
  const postalCode = 'Aberdeen';
  const zipCode = faker.location.zipCode()


  before(() => {
    cy.visit('/')
  })

  it('Register user test suite', () => {


    ////  REGISTER USER
    HeaderMenuPage.getLoginBtn().should('be.visible');
    HeaderMenuPage.getLoginBtn().should('contain', 'Login or register');
    cy.url().should('include', 'account/login');

    cy.contains('button', 'Continue').click();
    cy.url().should('include', 'account/create');

    RegisterPage.getFirstNameField().type(firstName);
    RegisterPage.getLastNameField().type(lastName);
    RegisterPage.getEmailField().type(email);
    RegisterPage.getAddress1Field().type(address1);
    RegisterPage.getCityField().type(city);
    RegisterPage.getPostalCodeField().select(postalCode);
    RegisterPage.getZipCodeField().type(zipCode);
    RegisterPage.getLoginNameField().type(loginName);
    RegisterPage.getPasswordField().type(password);
    RegisterPage.getPasswordConfirmField().type(password);

    cy.get('input[type="checkbox"][name="agree"]').check();
    cy.get('button[title="Continue"]').click();
    cy.contains('Your Account Has Been Created!').should('be.visible');


    /// EDIT COOUNT FIRST NAME


    cy.contains('.sub_menu.dropdown-menu a', 'Edit account details').click({ force: true });
    cy.url().should('include', 'account/edit');

    cy.get('#AccountFrm_firstname').type(faker.person.firstName());
    cy.get('button[title="Continue"]').click();
    cy.contains('Success: Your account has been successfully updated.').should('be.visible');



    // LOGOUT USER


    cy.get('ul.side_account_list a')
      .contains('Logoff')
      .click();

    cy.contains('a', 'Login or register').click({ force: true });

    cy.get('#loginFrm_loginname').type(loginName);
    //cy.log(loginName, lastName, firstName)
    cy.get('#loginFrm_password').type(password);
    cy.get('button[type="submit"]').contains('Login').click();
    cy.get('.menu_text').should('contain', 'Welcome back ' + `${firstName}`);


    //// PLACE ORDER


    cy.get('a.logo').find('img[title="Automation Test Store"]').click();

    cy.get('div.col-md-3.col-sm-6.col-xs-12')
      .find('div.pricetag.jumbotron')
      .first()
      .as('targetItem');

    cy.get('@targetItem')
      .find('a[title="Add to Cart"]')
      .click();

    cy.get('li.dropdown.hover a[href*="index.php?rt=checkout/cart"]').eq(0).click();

    cy.url().should('include', 'checkout/cart');

    cy.get('#cart_checkout2').click();

    cy.get('button#checkout_btn').click();

    cy.contains(' Your Order Has Been Processed!').should('be.visible');
  })
})



