const { spec, request } = require('pactum');
const { faker } = require('@faker-js/faker');
const getJsonSchema = require("../data/response/json-schema.json")
const { registerUser } = require("./registerUser")
const baseUrl = "https://test-api.k6.io/";

async function loginUser() {
    
    let username, password; // Define variables to store username and password

    before(async () => {
        // Register a user before the tests start
        const userCredentials = await registerUser();
        username = userCredentials.username;
        password = userCredentials.password;
    });

    it('auth cookie login', async () => {
        const apiBody = {
            "username": username,
            "password": password,
        };

        const response = await spec()
            .post(`${baseUrl}auth/cookie/login/`)
            .withBody(apiBody)
            .expectStatus(200)
            .expectJsonSchema(getJsonSchema)
            .inspect();
    });
}


module.exports = {
    loginUser
}