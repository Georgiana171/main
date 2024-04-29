const { spec, request } = require('pactum'); // we need to import spec from pactum package
const baseUrl = "https://test-api.k6.io";

async function doLogin(username, password) {
    const loginResponse = await spec().post(`${baseUrl}/auth/token/login/`)
        .withBody({
            "username": username,  // we put them here doLogin(username, password)  and we will use in the s
            "password": password
        })
        //.inspect()
        .expectStatus(200)

    tokenId = loginResponse.body.access //we know that we need to use .body.access because we used .inspect() , 
    //loginResponse is use to fetch the server's response and then we filter for the body and from the body we need the access token

    //console.log(tokenId) // we want to see if the tokenID has the token
    return loginResponse.body.access;
}

module.exports = {
    doLogin
} //this is used so we can export this into the auth.k6.test.js script
