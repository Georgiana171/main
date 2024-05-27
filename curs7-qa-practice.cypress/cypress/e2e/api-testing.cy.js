describe("API Test suite", () => {
    // it("GET posts API test", () => {
    //     cy.request("GET", "https://jsonplaceholder.typicode.com/posts").then(resp => {
    //         expect(resp.status).to.eq(200);
    //     })
    // })

    const baseUrl = "https://jsonplaceholder.typicode.com";

    it("GET posts API test", () => {
        cy.request("GET", `${baseUrl}/posts`).as('getPostsResponse');

        cy.get('@getPostsResponse').then(resp => {
            expect(resp.status).to.eql(200);
            expect(JSON.stringify(resp.body)).to.contain('userId');  // this will transform this whole body in a string and then search for userID presence in the string
        })
    })
})
