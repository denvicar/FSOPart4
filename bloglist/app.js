const config = require('./utils/config')
const mongoose = require('mongoose')
const express = require('express')
const middleware = require('./utils/middleware')
require('express-async-errors')
const app = express()
const blogRouter = require('./controllers/blogs')
const cors = require('cors')


mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use('/api/blogs',blogRouter)

app.use(middleware.errorHandler)

module.exports = app