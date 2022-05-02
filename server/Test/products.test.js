const request = require('supertest')
const app = require('../app.js')

describe("GET /api/products", () => {
    describe("get the list of products from commercejs or cache", () => {
        test("should response with 200 status code", async () => {
            const response = await request(app).get("/api/products")
            expect(response.statusCode).toBe(200)
        })
    })
})