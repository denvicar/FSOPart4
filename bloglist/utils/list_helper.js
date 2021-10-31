const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, blog) => acc+blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    const maxLikes = Math.max(...blogs.map(b=>b.likes))
    return blogs.find(b=>b.likes === maxLikes)
}

module.exports = {
    dummy, totalLikes, favoriteBlog
}