const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

blogSchema.set('toJSON', {
    transform: (doc, object) => {
        object.id = object._id.toString()
        delete object._id
        delete object.__v
    }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog