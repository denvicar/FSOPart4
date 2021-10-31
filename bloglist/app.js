const config = require('./utils/config')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const blogRouter = require('./controllers/blogs')
const cors = require('cors')


const mongoUrl = `mongodb+srv://fullstack:${config.PASSWORD}@cluster0.mcnv3.mongodb.net/bloglist?retryWrites=true&w=majority`
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.use('/api/blogs',blogRouter)

module.exports = app