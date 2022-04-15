const supertest = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Blogs = require('../models/post.model');
const blogTestHelper = require('./blogTestHelper');
const logger = require('../util/logger');

const api = supertest(app);

beforeEach(async () => {
    await Blogs.deleteMany()
    await Blogs.insertMany(blogTestHelper.initialBlogs)
})

test('id found in DB', async () => {
    const idFound = await blogTestHelper.blogsInDB()
    expect(idFound[0].id).toBeDefined()
})

describe('post new blog', () => {
    test('add a new post', async () => {
        const formData = {
            title: 'Take Your Github Repository To The Next Level 🚀️',
            author: 'Emmanuel',
            url: 'https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox',
            likes: 1
        }
        await api.post('/api/blogs')
            .expect(201)
            .send(formData)
            .expect('content-type', /application\/json/)

        const contents = await blogTestHelper.blogsInDB()
        const titles = contents.map(content => content.title)
        expect(contents).toHaveLength(blogTestHelper.initialBlogs.length + 1)

        expect(titles).toContain(formData.title)
    })

    test('like content missing default to 0', async () => {
        const formData = {
            title: 'Level up in React.js',
            author: 'Emmanuel Okuchukwu',
            url: 'https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox'
        }
        await api.post('/api/blogs')
            .send(formData)
            .expect(201)
            .expect('content-type', /application\/json/)
        const blogs = await blogTestHelper.blogsInDB()


        expect(blogs).toHaveLength(blogTestHelper.initialBlogs.length + 1)
        expect(blogs[blogTestHelper.initialBlogs.length].likes).toBe(0)
    })

    test('error if title and url are missing', async () => {
        const formData = {
            author: 'Emmanuel Okuchukwu',
            likes: 3
        }
        await api.post('/api/blogs')
            .send(formData)
            .expect(400)
            .expect('content-type', /application\/json/)
        const blogs = await blogTestHelper.blogsInDB()
        expect(blogs).toHaveLength(blogTestHelper.initialBlogs.length)
    })
})

describe('get blog info', () => {
    test('get blogs', async () => {
        await api.get('/api/blogs')
            .expect(200)
            .expect('content-type', /application\/json/)
    })
    test('get blog by id', async () => {
        const blogsAtStart = await blogTestHelper.blogsInDB()
        const blog = blogsAtStart[0]

        await api.get(`/api/blogs/${blog.id}`)
            .expect(200)
            .expect('content-type', /application\/json/)
    })
})



test('update blog', async () => {
    const blogs = await blogTestHelper.blogsInDB()
    const blogId = blogs[0]
    const formData = {
        title: 'New World Order is Evil',
        author: 'Emmanuel Okuchukwu',
        url: 'https://www.google.co.uk/',
        id: '6256cd83c51634b0963ccbe4',
        likes: 156
    }
    await api.put(`/api/blogs/${blogId?.id}`)
        .send(formData)
        .expect(200)
        .expect('content-type', /application\/json/)
    const blogsToEnd = await blogTestHelper.blogsInDB()
    expect(blogsToEnd).toHaveLength(blogTestHelper.initialBlogs.length)
    const titles = blogsToEnd.map(content => content.title)
    expect(titles).toContain(formData.title)
})

test('delete blog', async () => {
    const blogData = {
        title: "Hello World!",
        author: "Emmanuel Okuchukwu",
        url: "https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox",
        likes: 2,
        id: "6256beb26b5d81b6d46e0f30"
    }
    const blogsAtStart = await blogTestHelper.blogsInDB()
    const blogToView = blogsAtStart.find(blog => blog?.title === blogData?.title)

    await api.delete(`/api/blogs/${blogToView?.id}`)
        .expect(204)

    const blogsAtEnd = await blogTestHelper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(blogTestHelper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).not.toContain(blogsAtEnd.title)
})


afterAll(() => {
    mongoose.connection.close()
})