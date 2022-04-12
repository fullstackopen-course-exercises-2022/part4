
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, posts) => {
        return sum + posts.likes
    }

    return blogs.length === 0 ?
        0 : blogs.reduce(reducer, 0)
}

const favoritePost = (blogs) => {
    return blogs.length === 0 ?
        0 : blogs.reduce((sum, post) => post.likes > sum ? post.likes += sum : post.likes[0])
}

module.exports = { dummy, totalLikes, favoritePost }
