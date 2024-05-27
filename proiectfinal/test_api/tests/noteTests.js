const { spec, request } = require('pactum');
const { loginUser } = require('../utils/loginUser');
const baseUrl = "https://practice.expandtesting.com";
const getJsonSchema = require("../data/response/json-schema.json")

describe("Note Creation Test suite", () => {
    let authToken;
    let noteId;

    before(async function () {
        request.setDefaultTimeout(1000000);
        authToken = await loginUser();  // get the token once the user is loggedin
    });

    it('Create new note', async () => {
        noteId = await spec()
            .post(`${baseUrl}/notes/api/notes`)
            //.inspect()
            .withJson({ title: 'Test Note', description: 'This is a test note', category: 'Home' })
            .withHeaders({ 'x-auth-token': authToken,
            'Accept': 'application/json'  // Request JSON response from server
             })
            .expectStatus(200)
            .expectJsonLike({
                message: "Note successfully created"
            })
            .returns('data.id');

        console.log(`Created Note ID: ${noteId}`);
    });

    it('Get all notes', async () => {
        await spec().get(`${baseUrl}/notes/api/notes`)
        .withHeaders({ 'x-auth-token': authToken,
        'Accept': 'application/json' // Request JSON response from server
        })
        .expectStatus(200)
        .expectJsonLike({
            message: "Notes successfully retrieved"
        })
        //.inspect()
        .expectJsonSchema(getJsonSchema)  
    })

    it('Invalid attempt to get all notes', async () => {

        const wrongAuthToken = 'wrgwgwg5442344'
        await spec().get(`${baseUrl}/notes/api/notes`)
        .withHeaders({ 'x-auth-token': wrongAuthToken,
        'Accept': 'application/json' // Request JSON response from server
        })
        //.inspect()
        .expectStatus(401)
        .expectJsonLike({
           message: "Access token is not valid or has expired, you will need to login"
        })  
    });

    it('Delete Note by ID', async () => {
        await spec().delete(`${baseUrl}/notes/api/notes/${noteId}`)
          .withHeaders({ 'x-auth-token': authToken })
          //.inspect()
          .expectStatus(200);
        });
    });
