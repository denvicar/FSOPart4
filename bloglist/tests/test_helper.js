const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'title1',
        author: 'author1',
        url: 'url1',
        likes: 350
    },{
        title: 'title2',
        author: 'author2',
        url: 'url2',
        likes: 800
    },{
        title: 'title3',
        author: 'author3',
        url: 'url3',
        likes: 100
    },
    {
        title: 'title4',
        author: 'author1',
        url: 'url4',
        likes: 5
    },
    {
        title: 'title5',
        author: 'author1',
        url: 'url5',
        likes: 78
    },
    {
        title: 'title6',
        author: 'author3',
        url: 'url6',
        likes: 80
    },
    {
        title: 'title7',
        author: 'author2',
        url: 'url7',
        likes: 15
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(b=>b.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u=>u.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb, usersInDb
}

