const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

userRouter.post('/', async (request, response) => {
    const user = request.body
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
    const userList = await User.find({})
    response.json(userList)
})

module.exports = userRouter