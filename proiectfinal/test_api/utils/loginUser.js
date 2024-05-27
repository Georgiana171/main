const { spec } = require('pactum');
const { registerUser } = require('./registerUser');
const baseUrl = "https://practice.expandtesting.com";

async function loginUser() {
    const userCredentials = await registerUser();
    const email = userCredentials.email;
    const password = userCredentials.password;

    const response = await spec()
        .post(`${baseUrl}/notes/api/users/login`)
        .withBody({
            email: email,
            password: password
        })
        .expectStatus(200)
        .returns('res.body');

    const token = response.data.token;
    console.log('Login Token:', token);
    return token;
}

module.exports = {
    loginUser
};