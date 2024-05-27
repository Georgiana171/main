class LoginPage {
    getEmailField(){
        return cy.get("#email");
    }

    getPswField(){
        return cy.get("#password");
    }

    getSubmitLoginBtn(){
        return cy.get("#submitLoginBtn");
        //return cy.findByTestId("submitBtn");
    }

    getErrorMsg(){
        return cy.get('#message');
    }

    doLoginFromPOM(email,psw){
        this.getEmailField().type(email, {delay: 0});
        this.getPswField().type(psw, {delay: 0});
        this.getSubmitLoginBtn().click();
    }
}

export default new LoginPage();