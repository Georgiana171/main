const { faker } = require('@faker-js/faker');
const { spec, request } = require('pactum');
const baseUrl = "https://test-api.k6.io/";

async function registerUser() {
    const randomUsername = faker.internet.userName();
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    const requestBody = {
        "username": randomUsername,
        "first_name": firstName,
        "last_name": lastName,
        "email": email,
        "password": password
    }

    const expectedBody = { ...requestBody };
    delete expectedBody.password;

    const registrationResponse = await spec()
        .post(`${baseUrl}user/register/`)
        .withBody(requestBody)
        .expectStatus(201)
        .expectBody(expectedBody)
        .inspect();

    return { username: randomUsername, password };
}

module.exports = {
    registerUser
}
    
    
    
    
    
    
