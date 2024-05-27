const { faker } = require('@faker-js/faker');
const { spec } = require('pactum');
const baseUrl = "https://practice.expandtesting.com";

async function registerUser() {
    const randomUsername = faker.internet.userName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    const requestBody = {
        "name": randomUsername,
        "email": email,
        "password": password
    };

    const registrationResponse = await spec()
        .post(`${baseUrl}/notes/api/users/register`)
        .withHeaders('Content-Type', 'application/x-www-form-urlencoded')
        .withForm(requestBody)
        .expectStatus(201)
        .expectJsonLike({
            message: "User account created successfully",
        })
        .returns('res.body.data')
    //.inspect();

    return { email: registrationResponse.email, password };
}

module.exports = {
    registerUser
}