const mongoose = require('mongoose')
const Blog = require('../models/blog')
const app = require('../app')
const supertest = require('supertest')

const api = supertest(app)
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('cleared database')

    const blogs = helper.initialBlogs.map(b=> new Blog(b))
    const promises = blogs.map(b=>b.save())
    await Promise.all(promises)
})

test('for app returning correct amount of blogs', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type',/application\/json/)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('for verifying that unique identifier is id', async () => {
    const response = await api.get('/api/blogs')
    for(blog of response.body) {
        expect(blog.id).toBeDefined()
    }
})

afterAll(()=>{
    mongoose.connection.close()
})

