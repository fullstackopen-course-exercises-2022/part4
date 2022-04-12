const mongoose = require('mongoose')
const { info, error } = require('./util/logger')
const express = require('express')
const cors = require('cors')
const PostRouter = require('./controller/post.controller')
const { errorHandler } = require('./middle/errorHandler')
const app = express()
require('dotenv').config()
const password = process.env.DB_PASSWORD
const MongoURI = process.env.MONGODB_URI

app.get('/', (req, res) => {
    res.send(`<h1>Welcome to the Blog API!</h1>`)
})

mongoose.connect(MongoURI)
    .then(() => {
        info('Connect to MongoDB Database!')
    })
    .catch((err) => error(err))

app.use(cors())
app.use(express.json())

app.use('/api/blogs', PostRouter)

app.use(errorHandler)

module.exports = app
