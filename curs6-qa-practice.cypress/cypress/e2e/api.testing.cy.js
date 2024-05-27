const baseUrl = "https://jsonplaceholder.typicode.com/posts"

describe ("API testing suite", () => {

    it("GET post API test", () => {
        cy.request("GET", "https://jsonplaceholder.typicode.com/posts").then(request)
        expect(resp.status).to.eq(200)
    }
)
})