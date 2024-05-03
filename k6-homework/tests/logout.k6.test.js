const { spec, request } = require('pactum');
const { faker } = require('@faker-js/faker');
const getJsonSchema = require("../data/response/json-schema.json");
const { registerUser } = require("../utils/registerUser");
const { loginUser } = require("../utils/loginUser");
const baseUrl = "https://test-api.k6.io/";

describe("k6 logout test suite", () => {
    before(async () => {
        request.setDefaultTimeout(1000000);
        const userCredentials = await registerUser();
        const userLoggingIn = await loginUser(userCredentials.username, userCredentials.password);
    });

    it('logout user with correct credentials', async () => {        
        await spec()
            .post(`${baseUrl}auth/cookie/logout/`)
            .inspect()
            .expectStatus(200)
            .expectBody(''); //using the inspect i can see that the body is empty
    });
});