class HeaderMenuPage {
    getLoginBtn(){
        return cy.get('div #customer_menu_top li a').click();
    }
}

export default new HeaderMenuPage();