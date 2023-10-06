const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('../tests/test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[2])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const blogsInDb = await helper.blogsInDb();
    expect(blogsInDb).toHaveLength(helper.initialBlogs.length)
})

test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)
    expect(contents).toContain(
        'haukan tarinat')
})

test('blogs in database has id, not __id', async () => {
    const blogsInDb = await helper.blogsInDb()

    for (blog of blogsInDb) {
        expect(blog.id).toBeDefined();
    }
})

test('adding blogs function properly', async () => {
    const newBlog = {
        title: 'Blog list should involve this title',
        author: 'testAuthor',
        url: 'www.this-is-a-test.fi',
        likes: 8
    }
    await api.post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(contents).toContain(
        'Blog list should involve this title'
    )
})

test('deleting blogs function properly', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
    )

    const blogs = blogsAtEnd.map(r => r.title)

    expect(blogs).not.toContain(blogToDelete.title)
})

test('changing blog`s "likes" function properly', async () => {
    const blogsAtStart = await helper.blogsInDb()
     blog = blogsAtStart[0]

    const newBlog = {
        likes: 50
    }

    await api.put(`/api/blogs/${blog.id}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd[0]
    
    expect(updatedBlog.likes).toBe(newBlog.likes)
})

test('if added blog has no input on "likes", set "likes" to zero', async () => {
    const blogWithNoneLikes = {
        title: 'this is blog with no likes data',
        author: 'tester',
        url: 'www.setLikesZero.fi',
    }

    await api.post('/api/blogs')
        .send(blogWithNoneLikes)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsInDb = await helper.blogsInDb()

    const noneLikesBlog = blogsInDb.find(blog => blog.title === 'this is blog with no likes data')
    expect(noneLikesBlog.likes).toBe(0)

})


test('if added blog has no input on "url", make 400 Bad Request', async () => {
    const blogWithNoUrl = {
        title: 'this is blog with no url data',
        author: 'tester',
    }

    await api
        .post('/api/blogs')
        .send(blogWithNoUrl)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const blogsInDb = await helper.blogsInDb();

    const blogNotExisting = blogsInDb.find(blog => blog.author === 'tester')
    expect(blogNotExisting).toEqual(undefined)
})

test('if added blog has no input on "title", make 400 Bad Request', async () => {

    const blogWithNoTitle = {
        author: "tester",
        likes: 27,
        url: "www.testpage.fi"
    }

    await api.post('/api/blogs')
        .send(blogWithNoTitle)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const blogsInDb = await helper.blogsInDb()

    const nonExistingBlog = blogsInDb.find(blog => blog.author === 'tester')
    expect(nonExistingBlog).toEqual(undefined)
})

afterAll(() => {
    mongoose.connection.close()
})