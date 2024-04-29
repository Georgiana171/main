const { spec, request } = require('pactum'); // we need to import spec from pactum package
const { faker } = require('@faker-js/faker');
const { setBearerToken } = require('pactum/src/exports/request');
const { doLogin } = require("../utils/auth")
const baseUrl = "https://test-api.k6.io";

describe("k6 auth test suite", () => {

    let tokenID = ""; // we do this so we can use the token ID in other tests/it

    before(async () => { //before each test/it
        request.setDefaultTimeout(10000);

        const tokenID = await doLogin("gekmygjgfeg3", "ghdty!")
        /*
               const loginResponse = await spec().post(`${baseUrl}/auth/token/login/`)
                   .withBody({
                       "username": "gekmygjgfeg3",
                       "password": "ghdty!"
                   })
               //.inspect()
               .expectStatus(200)
       
               tokenId = loginResponse.body.access //we know that we need to use .body.access because we used .inspect() , 
               //loginResponse is use to fetch the server's response and then we filter for the body and from the body we need the access token
       
               //console.log(tokenId) // we want to see if the tokenID has the token
        */
    });


    it("k6 auth test - JWT", async () => {  //using async and await we make sure that javascript is waiting for a response from each line of code before going to the next one
        await spec()
            .get(`${baseUrl}/my/crocodiles/`)  //this ${baseUrl} is called string template literals
            .withHeaders("Authorization", "Bearer " + tokenId)
            .expectStatus(200);
    });
});
