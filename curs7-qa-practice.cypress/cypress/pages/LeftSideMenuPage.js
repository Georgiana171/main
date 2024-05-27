class LeftSideMenuPage {
    getShopEcommerceLink () {
        return cy.get("#auth-shop");
    }
}

export default new LeftSideMenuPage();