const Blog = require('../models/post.model')
const User = require('../models/users.model')
const requiredLogin = require('../middle/requireLogin')
const PostRoute = require('express').Router()
const logger = require('../util/logger')
require('dotenv').config()

PostRoute.post('/', requiredLogin, async (req, res, next) => {
    const { title, author, url, likes } = req.body
    const { user } = req;
    try {
        let post = await new Blog({
            title,
            author,
            url,
            likes,
            user: user?._id
        })
        logger.info(req.user)
        const savedBlog = await post.save()
        user.blog = user.blog.concat(savedBlog._id)
        await user.save()
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

PostRoute.put('/:postId', requiredLogin, async (req, res, next) => {
    const { postId } = req.params
    const { title, author, url, likes } = req.body
    try {
        const response = await Blog.findByIdAndUpdate(postId, { title, author, url, likes })
        res.status(200).json(response)
    } catch(err) {
        logger.error(err)
        next(err)
    }
})

PostRoute.delete('/:postId', requiredLogin, async (req, res, next) => {
    const { postId } = req.params
    const blog = await Blog.findById(postId)
    try {
        if(req?.user?._id.toString() === blog?.user?._id?.toString()) {
            await Blog.findByIdAndDelete(postId)
            res.status(204).end()
        } else {
            return res.status(401).end()
        }
    } catch(err) {
        logger.error(err)
        next(err)
    }
})

module.exports = PostRoute