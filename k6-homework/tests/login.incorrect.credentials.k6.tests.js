const { spec, request } = require('pactum');
const { faker } = require('@faker-js/faker');
const getJsonSchema = require("../data/response/json-schema.json");
const { registerUser } = require("../utils/registerUser");
const { loginUser } = require("../utils/loginUser");
const baseUrl = "https://test-api.k6.io/";

let goodCredentials, badCredentials;

describe("k6 login with incorrect credentials test suite", () => {
    before(async () => {
    request.setDefaultTimeout(1000000);
    goodCredentials = await registerUser();

    badCredentials = {
        username: faker.internet.userName(),
        password: faker.internet.password()
    };

    expectedErrorBody = {
        non_field_errors: [
            "Incorrect username or password."
        ]
    };
});

it('logout user with correct credentials', async () => {
    await spec()
        .post(`${baseUrl}auth/cookie/logout/`)
        .inspect()
        .expectStatus(200);
});

it('login with incorrect credentials', async () => {
    // Send a login request with bad credentials
        await spec()
        .post(`${baseUrl}auth/cookie/login/`)
        .inspect()
        .withBody(badCredentials)
        .expectStatus(400)
        .expectBody(expectedErrorBody)
})
})
