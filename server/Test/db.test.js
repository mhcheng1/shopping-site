const request = require('supertest')
const app = require('../app.js')

describe("POST /api/db/insertUser", () => {
    const sampleRequest = {
        email: "test@gmail.com",
        first_name: "tester"
    }

    describe("given user information: email and first_name", () => {
        test("should response with 200 status code", async () => {
            const response = await request(app).post("/api/db/insertUser").send(sampleRequest)
            expect(response.statusCode).toBe(200)
        })
    })
})

describe("POST /api/db/insertOrder", () => {
    const sampleRequest = {
        email: "test@gmail.com",
        receipt_url: "receipt_url",
        total: 100,
        data: "sample date"
    }

    describe("given user information: email and first_name", () => {
        test("should response with 200 status code", async () => {
            const response = await request(app).post("/api/db/insertOrder").send(sampleRequest)
            expect(response.statusCode).toBe(200)
        })
    })
})