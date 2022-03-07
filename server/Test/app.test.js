const request = require('supertest')
const app = require('../app.js').func()

describe("POST /api/insertTest", () => {
    const sampleRequest = {
        email: "test@gmail.com",
        first_name: "tester"
    }

    describe("given user information: email and first_name", () => {
        test("should response with 200 status code", async () => {
            const response = await request(app).post("/api/insertTest").send(sampleRequest)
            expect(response.statusCode).toBe(200)
        })

        test("should specify json in the content type header", async() => {
            const response = await request(app).post("/api/insertTest").send(sampleRequest)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })

        test("should have valid user email and first name", async() => {
            const response = await request(app).post("/api/insertTest").send(sampleRequest)
            expect(response.body.email).toBeDefined()
            expect(response.body.first_name).toBeDefined()
        })
    })
})


describe("POST /api/insertUser", () => {
    const sampleRequest = {
        email: "test@gmail.com",
        first_name: "tester"
    }

    describe("given user information: email and first_name", () => {
        test("should response with 200 status code", async () => {
            const response = await request(app).post("/api/insertUser").send(sampleRequest)
            expect(response.statusCode).toBe(200)
        })
    })
})

describe("POST /api/insertOrder", () => {
    const sampleRequest = {
        email: "test@gmail.com",
        receipt_url: "receipt_url",
        total: 100,
        data: "sample date"
    }

    describe("given user information: email and first_name", () => {
        test("should response with 200 status code", async () => {
            const response = await request(app).post("/api/insertOrder").send(sampleRequest)
            expect(response.statusCode).toBe(200)
        })
    })
})