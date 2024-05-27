const { spec } = require('pactum');
const { faker } = require('@faker-js/faker');
const baseUrl = "https://practice.expandtesting.com";

async function registerUserInvalid() {
    const email = faker.internet.email();
    const password = faker.internet.password();

    const requestBody = {
        //"name": randomUsername
        "email": email,
        "password": password
    };

    await spec()
        .post(`${baseUrl}/notes/api/users/register`)
        .withHeaders('Content-Type', 'application/x-www-form-urlencoded')
        .withForm(requestBody)
        .expectStatus(400)
        .expectJsonLike({
            message: "User name must be between 4 and 30 characters",
        });
}

module.exports = {
    registerUserInvalid
}