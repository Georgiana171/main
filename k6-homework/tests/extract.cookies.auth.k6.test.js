const { spec, request } = require('pactum');
const { faker } = require('@faker-js/faker');
const getJsonSchema = require("../data/response/json-schema.json")
const { registerUser } = require("../utils/registerUser")
const baseUrl = "https://test-api.k6.io/";

describe("k6 cookies/session based auth test suite", () => {
    before(() => {
        request.setDefaultTimeout(1000000);
    });

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

        //console.log(response);

        // Extract the cookie from the response header
        const sessionCookie = response.headers['set-cookie'][0];
        console.log("Session Cookie:", sessionCookie);
        const setCookieHeader = response.headers['set-cookie'];

        //this is checking if the cookieheader is an array of objects and if we have at least one cookie present
        if (Array.isArray(setCookieHeader) && setCookieHeader[0]) {
            console.log(setCookieHeader[0]);
        } else {
            console.log('Cookie header not present');
        }
    });
})