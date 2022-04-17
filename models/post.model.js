const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 5
    },
    author: {
        type: String,
        required: true,
        minLength: 5
    },
    url: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: true,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
}, {timestamps: true})

blogSchema.set('toJSON', {
    transform: (doc, object) => {
        object.id = object._id.toString()
        delete object._id
        delete object.__v
    }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog