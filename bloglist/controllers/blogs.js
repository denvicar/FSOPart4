const appRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

appRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
  })
  
appRouter.post('/', async (request, response) => {
    const user = await User.findOne({})
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