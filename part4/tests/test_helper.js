const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: "title",
        author: "author",
        url: "www.url.fi",
        likes: 100,
        id: "6513f57258283ffd1cbf0c86"
    },
    {
        title: "haukan tarinat",
        author: "haukka",
        url: "www.haukka.fi",
        likes: 90,
        id: "6513f70a1765920200ea07ed"
    },
    {
        title: "keijon blogi",
        author: "keijo",
        url: "www.keijonblogi.fi",
        likes: 99,
        id: "6513fcf092561fcaa04bab3c"
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }

module.exports = {
    initialBlogs, blogsInDb, usersInDb
}
