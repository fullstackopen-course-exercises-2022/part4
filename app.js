const mongoose = require('mongoose')
const { info, error } = require('./util/logger')
const express = require('express')
const cors = require('cors')
const PostRouter = require('./controller/post.controller')
const { errorHandler } = require('./middle/errorHandler')
const app = express()
require('dotenv').config()
const password = process.env.DB_PASSWORD

const mongoUrl = `mongodb+srv://root:${password}@cluster0.de3qk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
mongoose.connect(mongoUrl)
    .then(() => {
        info('Connect to MongoDB Database!')
    })
    .catch((err) => error(err))

app.use(cors())
app.use(express.json())

app.use('/api/blogs', PostRouter)

app.use(errorHandler)

module.exports = app
