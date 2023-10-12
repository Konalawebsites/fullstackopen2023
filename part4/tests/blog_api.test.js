const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../tests/test_helper')

const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)
/* get new JWT BEARER TOKEN ending part by logging in with Postman - one log-in lasts 1 hour */
const JWT_BEARER_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImthdHV1c2EiLCJpZCI6IjY1MjZhOGNjZWRkOTEwOGNhNDg5ZmEwMSIsImlhdCI6MTY5NzA5Nzk3OSwiZXhwIjoxNjk3MTAxNTc5fQ.SMpnsKYYYyggttnbG0gpS4-ICR_pA7d9KbtWJYMINio'

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[2])
    await blogObject.save()

    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('root', 10)
    const user = new User({ username: 'testimees', password: 'testimees', passwordHash })
    await user.save()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .set('Authorization', JWT_BEARER_TOKEN) 
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const blogsInDb = await helper.blogsInDb();
    expect(blogsInDb).toHaveLength(helper.initialBlogs.length)
})

test('a specific note is within the returned notes', async () => {
    const blogsInDb = await helper.blogsInDb()
    const contents = blogsInDb.map(r => r.title)

    expect(contents).toContain(
        'haukan tarinat')
})

test('blogs in database has id, not __id', async () => {
    const blogsInDb = await helper.blogsInDb()

    for (blog of blogsInDb) {
        expect(blog.id).toBeDefined();
    }
})

test.only('adding blogs function properly', async () => {

    const newBlog = {
        title: 'Blog list should involve this title',
        author: 'testAuthor',
        url: 'www.this-is-a-test.fi',
        likes: 8
    }
    console.log('blog.api.test.js JWT_BEARER_TOKEN:', JWT_BEARER_TOKEN)
    await api.post('/api/blogs')
        .set('Authorization', JWT_BEARER_TOKEN )
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsInDb = await helper.blogsInDb();
    console.log(blogsInDb)

    const contents = response.map(r => r.title)

    expect(response).toHaveLength(helper.initialBlogs.length + 1)
    expect(contents).toContain(
        'Blog list should involve this title'
    )
})

test('changing blog`s "likes" function properly', () => {

    app.put('/api/notes/:id', (request, response, next) => {
        const body = request.body
      
        const blog = {
          likes: body.likes
        }
      
        Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
          .then(updatedBlog => {
            response.json(updatedBlog)
          })
          .catch(error => next(error))
      })
})

test('if added blog has no input on "likes", set "likes" to zero', async () => {
    const blogWithNoneLikes = {
        title: 'this is blog with no likes data',
        author: 'tester',
        url: 'www.setLikesZero.fi',
    }

    await api.post('/api/blogs')
        .set('Authorization', JWT_BEARER_TOKEN)
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