const appRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const userExtractor = require('../utils/middleware').userExtractor

appRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
  })
  
appRouter.post('/', userExtractor, async (request, response) => {
    const user = request.user

    const post = request.body
    const blog = new Blog({
        author: post.author,
        url: post.url,
        likes: post.likes,
        title: post.title,
        user: user._id
    })


    const result = await blog.save()

    user.blogs = user.blogs.concat(result._id)
    await user.save()
    response.status(201).json(result)
})

appRouter.delete('/:id', userExtractor, async (request,response) => {
    const user = request.user

    const blogToDelete = await Blog.findById(request.params.id)
    if(blogToDelete.user.toString() === user._id.toString()) {
        await blogToDelete.delete()
        return response.status(204).end()  
    } 

    response.status(401).send({error: 'you are not allowed to do this operation'})

})

appRouter.put('/:id', async (request,response) => {
    const postToUpdate = {
        likes: request.body.likes
    }

    const updated = await Blog
        .findByIdAndUpdate(request.params.id, postToUpdate, {new: true, runWithValidators: true})
    response.json(updated)

})


  module.exports = appRouter