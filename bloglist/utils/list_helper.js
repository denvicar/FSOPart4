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

const mostLikes = (blogs) => {
    if (blogs.length === 0) return undefined
    const blogsByAuthor = _.groupBy(blogs,'author')
    const authorsWithLikes = _.transform(blogsByAuthor, (result, value, key) => {
        console.log(value)
        result[key] = value.reduce((acc,blog)=>acc+blog.likes,0)
    }, {})
    const maxAuthor = _.maxBy(_.toPairs(authorsWithLikes), o=>o[1])
    return {author: maxAuthor[0], likes: maxAuthor[1]}

}


module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}