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

test('for verifying the insert of a new blog post', async () => {
    const newBlog = {
        author: 'mock',
        title: 'mock title for test',
        url: 'mockUrl',
        likes: 42
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type',/application\/json/)

    const blogPostsAtEnd = await helper.blogsInDb()
    expect(blogPostsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const titles = blogPostsAtEnd.map(b=>b.title)
    expect(titles).toContain('mock title for test')

})

test('for a blog post without likes to default to 0', async () => {
    const newPost = {
        author: 'mock author',
        title: 'post without likes',
        url: 'test url'
    }

    const resp = await api
        .post('/api/blogs')
        .send(newPost)
        .expect(201)
        .expect('Content-Type',/application\/json/)


    expect(resp.body.likes).toBe(0)
})

test('for inserting a post without title', async () => {
    const newPostWithoutTitle = {
        author: 'mock author',
    }

    await api
        .post('/api/blogs')
        .send(newPostWithoutTitle)
        .expect(400)

    const posts = await helper.blogsInDb()
    expect(posts.length).toBe(helper.initialBlogs.length)

})

afterAll(()=>{
    mongoose.connection.close()
})

