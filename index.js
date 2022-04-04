const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require('./models/post.model')
// const { getPosts, addPost } = require('./controller/post.controller')
const PostRouter = require('./controller/post.controller')
const { info, error } = require('./util/logger')
const consoleError = error
const PORT = 5001

const mongoUrl = 'mongodb+srv://root:helloworld@cluster0.de3qk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(mongoUrl)
    .then(() => {
        info('Connect to MongoDB Database!')
    })
    .catch((error) => consoleError(error))

app.use(cors())
app.use(express.json())

app.use('/api/blogs', PostRouter)

app.listen(PORT, () => {
    info(`Server running on port ${PORT}`)
})