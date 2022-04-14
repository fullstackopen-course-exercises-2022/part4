const listHelper = require('../util/listHelper.js');

const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "https://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

test('returns 1 dummy value', () => {
   const blogs = []
    const dummy = listHelper.dummy(blogs)
    expect(dummy).toBe(1)
})

describe('Total likes', () => {
    test('returns 0 likes', () => {
        const likes = listHelper.totalLikes([])
        expect(likes).toBe(0)
    })
    test('returns total likes', () => {
        const likes = listHelper.totalLikes(blogs)
        expect(likes).toBe(36)
    })
    test('returns one like total', () => {
        const likes = listHelper.totalLikes([blogs[0]])
        expect(likes).toBe(7)
    })
})

describe('find favorite blog post', () => {
    test('return no posts', () => {
        const post = listHelper.favoritePost([])
        expect(post).toEqual(0)
    })
    test('return favorite blog post', () => {
        const post = blogs[0]
        const allLikes = listHelper.favoritePost([post])
        const favorite = blogs.find(p => p.likes === allLikes.likes)
        expect(favorite).toEqual({
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
        })
    })
})

