class RegisterPage {
    getFirstNameField() {
        return cy.get("#AccountFrm_firstname");
    }

    getLastNameField() {
        return cy.get("#AccountFrm_lastname");
    }

    getEmailField() {
        return cy.get("#AccountFrm_email");
    }

    getAddress1Field() {
        return cy.get('#AccountFrm_address_1');
    }

    getCityField() {
        return cy.get('#AccountFrm_city');
    }

    getPostalCodeField() {
        return cy.get('#AccountFrm_zone_id').select('Aberdeen');
    }
    getZipCodeField() {
        return cy.get('#AccountFrm_postcode')
    }
    getLoginNameField() {
        return cy.get('#AccountFrm_loginname');
    }

    getPasswordField() {
        return cy.get("#AccountFrm_password");
    }

    getPasswordConfirmField() {
        return cy.get("#AccountFrm_confirm");
    }

    doRegisterFromPOM(firstName, lastName, emailAddress, address1, cityName, postalCode, zipCode, loginName, password, confirmPassword) {
        this.getFirstNameField().type(firstName);
        this.getLastNameField().type(lastName,);
        this.getEmailField().type(emailAddress);
        this.getAddress1Field().type(address1);
        this.getCityField().type(cityName);
        this.getPostalCodeField().select(postalCode);
        this.getZipCodeField().type(zipCode);
        this.getLoginNameField().type(loginName);
        this.getPasswordField().type(password);
        this.getPasswordConfirmField().type(confirmPassword);
    }
}

export default new RegisterPage();