const _ = require('lodash')

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

const mostBlogs = (blogs) => {
    if (blogs.length === 0 ) return undefined
    const mostBlogAuthor = _.maxBy(_.toPairs(_.countBy(blogs, 'author')), o=>o[1])
    return {author: mostBlogAuthor[0], blogs: mostBlogAuthor[1]}
}


module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs
}