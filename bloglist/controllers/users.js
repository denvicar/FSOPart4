const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

userRouter.post('/', async (request, response) => {
    const user = request.body

    if(!user.password || user.password.length < 3) {
        return response.status(400).send({error: "User validation failed: password has to be specified with a minimum length of 3"})
    }

    const passwordHash = await bcrypt.hash(user.password,10)

    const userToAdd = new User({
        username: user.username,
        name: user.name,
        passwordHash
    })

    const result = await userToAdd.save()
    response.status(201).json(result)
})

userRouter.get('/', async (request, response) => {
    const userList = await User.find({}).populate('blogs', {title: 1, author: 1, url: 1, likes: 1})
    response.json(userList)
})

module.exports = userRouter