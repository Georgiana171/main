describe("Intercepting API test suite", () => {
    it("Waiting for API before other actions in the web app", ()=>{
        cy.intercept({
            method: "GET",
            url: "/comments"
        }).as('commentsAPI');

        cy.visit("/");
        cy.get("#intercept-api").click();
        
        cy.wait('@commentsAPI').its('response.statusCode').should('eq', 200);

        const postTitle = 'something';

        cy.get("#postTitleInput").type(postTitle);
        cy.contains("CREATE post").click();
        cy.get("#response").should('contain', `New ${postTitle} post CREATED. API Request sent. You can find it in DevTools (F12) > Network tab.`)
    })

    /*
    it('mock api response', () => { //now we want to simulate that the server will give us status code 500 and also a different body response
        cy.intercept({
            method: "GET",
            url: "/comments"
        }, {
            statusCode: 201,
            body: [{                
                    "postId": 23,
                    "id": 5,
                    "name": "curs testare",
                    "email": "qa@grwfw.biz",
                    "body": "test test test"
                }]
        }).as('commentsAPIMocked')

        cy.visit("/");
        cy.get("#intercept-api").click();
        cy.wait('@commentsAPIMocked').its('response.statusCode').should('eq', 201);
    })
    */

    it('mock api response', () => {
        cy.intercept({
            method: "GET",
            url: "/comments"
        }, {
            statusCode: 500,
            body: []
        }).as('commentsAPIMocked')

        cy.visit("/");
        cy.get("#intercept-api").click();
        cy.wait('@commentsAPIMocked').its('response.statusCode').should('eql',500);
    })
})
