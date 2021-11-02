const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('../utils/config')

const errorHandler = (error,request,response,next) => {
    if(error.name==='ValidationError') {
        return response.status(400).json({error: error.message})
    } else if (error.name==='CastError') {
        return response.status(400).send({error: 'malformed id'})
    } else if (error.name==='JsonWebTokenError') {
        return response.status(401).send({error: 'invalid token'})
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
        return response
          .status(400)
          .send({ error: 'Username already exists!' })
    }

    next(error)
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
    }
    next()
}

const userExtractor = async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, config.SECRET)
    if(!decodedToken || !decodedToken.id) {
        return response.status(401).send({error: 'invalid token'})
    }
    const user = await User.findById(decodedToken.id)
    request.user = user
    next()
}

module.exports = {
    errorHandler, tokenExtractor, userExtractor
}