const { spec, request } = require('pactum'); // we need to import spec from pactum package
const { faker } = require('@faker-js/faker');
const getPhotosSchema = require("../data/response/get-photos-schema.json")
const baseUrl = "https://jsonplaceholder.typicode.com";

describe("photos test suite", () => {
    before(async () => { //before each test/it
        request.setDefaultTimeout(10000);
    });

    it("get photos", async () => {  //using async and await we make sure that javascript is waiting for a response from each line of code before going to the next one
          await spec()
            .get(`${baseUrl}/photos`)  //this ${baseUrl} is called string template literals
            //.inspect() //more debugging in the terminal
            .expectStatus(200)
            .expectBodyContains("albumId")
            .expectJsonSchema(getPhotosSchema) // check folder get-photos-schema.json where the json schema is located
    });

    it("get photo by id test", async () => {  //using async and await we make sure that javascript is waiting for a response from each line of code before going to the next one
        const photoID = 1;
        const requestBody = {
            "albumId": 1,
            "id": 1,
            "title": "accusamus beatae ad facilis cum similique qui sunt",
            "url": "https://via.placeholder.com/600/92c952",
            "thumbnailUrl": "https://via.placeholder.com/150/92c952"
        }

        await spec()
            .get(`${baseUrl}/photos/${photoID}`)  //this ${baseUrl} is called string template literals
            //.inspect() //more debugging in the terminal
            .expectStatus(200)
            .expectBodyContains("albumId")
            .expectBody(requestBody)
    });
});
