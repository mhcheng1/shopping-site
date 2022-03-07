const request = require('supertest')
const app = require('./app.js').func()

describe("POST /api/insertUser", () => {

    describe("given user information: email and first_name", () => {
        // check if status code is 200
        test("should response with 200 status code", async () => {
            const response = await request(app).post("/api/insertTest").send({
                email: "test@gmail.com",
                first_name: "tester"
            })
            expect(response.statusCode).toBe(200)
        })

        // check if post content is json
        test("should specify json in the content type header", async() => {
            const response = await request(app).post("/api/insertTest").send({
                email: "test@gmail.com",
                first_name: "tester"
            })
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })


        test("should have valid user email", async() => {
            const response = await request(app).post("/api/insertTest").send({
                email: "test@gmail.com",
                first_name: "tester"
            })
            expect(response.body.email).toBeDefined()
        })
    })
})