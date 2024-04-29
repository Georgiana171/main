const { spec, request } = require('pactum'); // we need to import spec from pactum package
const { faker } = require('@faker-js/faker');
const baseUrl = "https://jsonplaceholder.typicode.com";

describe("post test suite", () => {
    before(async () => { //before each test/it
        request.setDefaultTimeout(10000);
    });

    it("get posts test", async () => {  //using async and await we make sure that javascript is waiting for a response from each line of code before going to the next one
        await spec()
            .get(`${baseUrl}/posts`)  //this ${baseUrl} is called string template literals
            .expectStatus(200);
    });

    it("create post", async () => {
        const randomTitle = faker.internet.email()

        console.log(randomTitle)

        const requestBody = {
            "tile": randomTitle,
            "body": "altceva"
        }

        await spec()
            .post(`${baseUrl}/posts`)
            .withBody(requestBody)
            .expectStatus(201)
            .expectBodyContains(randomTitle)

    })

    it("delete post", async () => {
        await spec()
            .delete(`${baseUrl}/posts/1`)
            .expectStatus(200);
    })

    //--------------------------------- OR


    it("delete post2", async () => {
        //create post
        const requestBody = {
            "tile": "ceva nou titlu",
            "body": "altceva"
        }

        const createPost = await spec()
            .post(`${baseUrl}/posts`)
            .withBody(requestBody)
            .expectStatus(201);

        const postID = createPost.json.id;

        //delete the above created post
        await spec()
            .delete(`${baseUrl}/posts/${postID}`)
            .expectStatus(200);
    })
});
