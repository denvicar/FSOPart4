const listHelper = require('../utils/list_helper')

test('dummy returns 1', () => {
    expect(listHelper.dummy([])).toBe(1)
})

describe('total likes', () => {
    test('of empty list is zero', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })

    test('when a list has one blog returns the likes of that', () => {
        const blog = [
            {
                title: 'mock title',
                url: 'mockurl',
                author: 'mockauthor',
                likes: 500
            },]

        expect(listHelper.totalLikes(blog)).toBe(500)
    })

    test('of a bigger list is calculated right', () => {
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

        expect(listHelper.totalLikes(blogList)).toBe(1250)
    })


})