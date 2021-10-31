const listHelper = require('../utils/list_helper')

const blog = [
    {
        title: 'mock title',
        url: 'mockurl',
        author: 'mockauthor',
        likes: 500
    },]

const blogList = [
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
    }
]

const blogListBigger = [
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


test('dummy returns 1', () => {
    expect(listHelper.dummy([])).toBe(1)
})

describe('total likes', () => {
    

    test('of empty list is zero', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })

    test('when a list has one blog returns the likes of that', () => {

        expect(listHelper.totalLikes(blog)).toBe(500)
    })

    test('of a bigger list is calculated right', () => {

        expect(listHelper.totalLikes(blogList)).toBe(1250)
    })


})

describe('favorite blog', () => {
    test('for empty list should return undefined', () => {
        expect(listHelper.favoriteBlog([])).toBe(undefined)
    })

    test('for single blog to return same blog', () => {
        expect(listHelper.favoriteBlog(blog)).toEqual(blog[0])
    })

    test('for a list of blogs to return the one with the most likes', () => {
        expect(listHelper.favoriteBlog(blogList)).toEqual({
            title: 'title2',
            author: 'author2',
            url: 'url2',
            likes: 800
        })
    })
})

describe('most blogs', () => {
    test('for an empty list to return undefined', ()=>{
        expect(listHelper.mostBlogs([])).toBe(undefined)
    })

    test('for a single blog to return its author', ()=>{
        expect(listHelper.mostBlogs(blog)).toEqual({
            author: 'mockauthor',
            blogs: 1
        })
    })

    test('for a list to return the author with the most blogs', () => {
        expect(listHelper.mostBlogs(blogListBigger)).toEqual({
            author: 'author1',
            blogs: 3
        })
    })
})

describe('most likes', () => {
    test('for an empty list to return undefined', ()=>{
        expect(listHelper.mostLikes([])).toBe(undefined)
    })

    test('for a single blog to return its author', ()=>{
        expect(listHelper.mostLikes(blog)).toEqual({
            author: 'mockauthor',
            likes: 500
        })
    })

    test('for a list to return the author with the most blogs', () => {
        expect(listHelper.mostLikes(blogListBigger)).toEqual({
            author: 'author2',
            likes: 815
        })
    })
})