const Blog = require('../models/post.model')
const PostRoute = require('express').Router()
const logger = require('../util/logger')

PostRoute.post('/', async (req, res, next) => {
    const { title, author, url, likes } = req.body
    try {
        let post = new Blog({
            title, author,
            url, likes
        })
        await post.save()
        res.status(201).json(post)
    } catch(err) {
        logger.error(err)
        next(err)
    }
})

PostRoute.get('/', async (req, res, next ) => {
    try {
        const response = await Blog.find({})
        res.status(200).json(response)
    } catch(err) {
        logger.error(err)
        next(err)
    }
})

PostRoute.get('/:postId', async (req, res, next) => {
    const { postId } = req.params
    try {
        const response = await Blog.findById(postId)
        res.status(200).json(response)
    } catch(err) {
        logger.error(err)
        next(err)
    }
})

PostRoute.put('/:postId', async (req, res, next) => {
    const { postId } = req.params
    const { title, author, url, likes } = req.body
    try {
        const response = await Blog.findByIdAndUpdate(postId, {title, author, url, likes})
        res.status(200).json(response)
    } catch(err) {
        logger.error(err)
        next(err)
    }
})

PostRoute.delete('/:postId', async (req, res, next) => {
    const { postId } = req.params
    try {
        await Blog.findByIdAndDelete(postId)
        res.status(204).end()
    } catch(err) {
        logger.error(err)
        next(err)
    }
})

module.exports = PostRoute