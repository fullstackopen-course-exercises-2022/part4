const Blog = require('../models/post.model');


const initialBlogs = [
    {
        title: 'Hello World!',
        author: 'Emmanuel Okuchukwu',
        url: 'https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox',
        likes: 2,
        id: '6255852bbe1bad469d7d0r43'
    },
    {
        title: 'Hello Groovy!',
        author: 'Anoj Kunes',
        url: 'https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox',
        likes: 15,
        id: '6255854913525656af03c4re'
    },
]

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs?.map(blog => blog.toJSON())
}

module.exports = { initialBlogs, blogsInDB }