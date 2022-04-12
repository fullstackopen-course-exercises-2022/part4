const supertest = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Post = require('../models/post.model');
const blogTestHelper = require('./blogTestHelper');

const api = supertest(app);

test('id found in DB', async () => {
    const idFound = await Post.find({})
    expect(idFound[0].id).toBeDefined()
})

test('add a new post', async () => {
    const formData = {
        title: 'Hello!',
        author: 'Emmanuel',
        url: 'https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox',
        likes: 1
    }
    await api.post('/api/blogs')
        .expect(201)
        .send(formData)
        .expect('content-type', /application\/json/)

    const contents = await blogTestHelper.blogsInDB()
    const title = contents.map(content => content.title)
    expect(contents).toHaveLength(blogTestHelper.initialBlogs.length + 1)

    expect(title).toContain('Take Your Github Repository To The Next Level 🚀️')
    console.log(title)
})

test('get blogs', async () => {
    await api.get('/api/blogs')
        .expect(200)
        .expect('content-type', /application\/json/)
})


afterAll(() => {
    mongoose.connection.close()
})