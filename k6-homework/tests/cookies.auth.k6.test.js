const { spec, request } = require('pactum');
const { faker } = require('@faker-js/faker');
const getJsonSchema = require("../data/response/json-schema.json")
const baseUrl = "https://test-api.k6.io/";

describe("k6 cookies/session based auth test suite", () => {
    let randomUsername = faker.internet.userName()
    let firstName = faker.person.firstName()
    let lastName = faker.person.lastName()
    let email = faker.internet.email()
    let password = faker.internet.password()

    before(() => {
        request.setDefaultTimeout(1000000);
    });

    it('create a new user account', async () => {
        const requestBody = {
            "username": randomUsername,
            "first_name": firstName,
            "last_name": lastName,
            "email": email,
            "password": password
        }

        const expectedBody = { ...requestBody };
        delete expectedBody.password;

        await spec()
            .post(`${baseUrl}user/register/`)
            .withBody(requestBody)
            .expectStatus(201)
            .expectBody(expectedBody)
            .inspect();
    });

    it('auth cookie login', async () => {
        const cookieBody = {
            "username": randomUsername,
            "password": password,
        };
    
            const response = await spec()
            .post(`${baseUrl}auth/cookie/login/`)
            .withBody(cookieBody)
            .expectStatus(200)
            .expectJsonSchema(getJsonSchema)
            .inspect();
    
        //console.log(response);
    
        // Extract the cookie from the response header
        const sessionCookie = response.headers['set-cookie'][0];
        console.log("Session Cookie:", sessionCookie); 
    });
});