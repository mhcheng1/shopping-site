const request = require('supertest')
const app = require('../app.js')

describe("GET /api/products", () => {

    describe("given user information: email and first_name", () => {
        test("should response with 200 status code", async () => {
            const response = await request(app).get("/api/products")
            expect(response.statusCode).toBe(200)
        })
    })
})