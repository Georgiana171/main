class HeaderMenuPage {
    getLogoutBtn(){
        return cy.get('li.lgout a');
    }
}

export default new HeaderMenuPage();