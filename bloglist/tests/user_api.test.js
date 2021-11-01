const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)
const helper = require('./test_helper')

beforeEach(async () => {
    await User.deleteMany({})
    console.log('database cleared')
})

describe('User API', () => {
    test('for invalid input', async ()=>{
        const invalidUser1 = {
            password: "password",
            name: "Marco"
        }

        const invalidUser2 = {
            username: "mark2",
            name: "Marco"
        }

        const invalidUser3 = {
            username: "ci",
            password: "sdkjfalsdjf",
            name: "Mark"
        }

        const response1 = await api
            .post('/api/users')
            .send(invalidUser1)
            .expect(400)
            .expect('Content-Type',/application\/json/)

        const response2 = await api
            .post('/api/users')
            .send(invalidUser2)
            .expect(400)
            .expect('Content-Type',/application\/json/)

        const response3 = await api
            .post('/api/users')
            .send(invalidUser3)
            .expect(400)
            .expect('Content-Type',/application\/json/)

        expect(response1.body.error).toEqual(expect.stringContaining('validation'))
        expect(response2.body.error).toEqual(expect.stringContaining('validation'))
        expect(response3.body.error).toEqual(expect.stringContaining('validation'))


    })

})


afterAll(() => {
    mongoose.connection.close()
})