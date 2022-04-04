const Blog = require('../models/post.model')
const PostRoute = require('express').Router()

PostRoute.get('/',  (req, res) => {
    Blog.find({})
        .then(blogs => {
            res.json(blogs)
        })
})

PostRoute.post('/', (req, res) => {
    const { title, author, url, likes } = req.body;
    const post = new Blog({
        title, author,
        url, likes
    })
    post.save()
        .then((results) => {
            res.status(201).json(results)
        })
})

module.exports = PostRoute;