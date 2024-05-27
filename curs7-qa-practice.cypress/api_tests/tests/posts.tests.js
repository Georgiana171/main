const { spec, request } = require("pactum");
const { faker, base } = require("@faker-js/faker");

const baseUrl = "https://jsonplaceholder.typicode.com";

describe("Posts test suite", () => {
    before(async () => {
        request.setDefaultTimeout(15000);
    })

    it("get all posts", async () => {
        await spec().get(`${baseUrl}/posts`)
        .expectStatus(200);
    })
})