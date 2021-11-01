const appRouter = require('express').Router()
const Blog = require('../models/blog')

appRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
  })
  
appRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    const result = await blog.save()
    response.status(201).json(result)
})

appRouter.delete('/:id', async (request,response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
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