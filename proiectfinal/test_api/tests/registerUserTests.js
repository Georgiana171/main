const { spec, request } = require('pactum');
const { faker } = require('@faker-js/faker');
const { registerUser } = require('../utils/registerUser');
const { loginUser } = require('../utils/loginUser');
const { registerUserInvalid } = require('../utils/registerUserInvalid');
const baseUrl = "https://practice.expandtesting.com";

let goodCredentials;

describe("Register user test suite", () => {
    before(async () => {
        request.setDefaultTimeout(10000);
        goodCredentials = await registerUser();
    });

    describe("Valid user registration test", () => {
        it('A valid user will be registered', async () => {
        loginUser();
    });
});
;

    describe("Invalid user registration test", () => {
        it('should not register an invalid user', async () => {
            await registerUserInvalid();
        });
    });
})
