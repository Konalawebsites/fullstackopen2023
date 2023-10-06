const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const app = require('../app')

usersRouter.get('/', async (request, response) => {
  const users = await User
  .find({}).populate('blogs', { title: 1, author: 1 })

  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  
  const user = new User({
    username: username,
    name: name,
    passwordHash,
  })

  const savedUser = await user.save()
  response.json(savedUser)
})

module.exports = usersRouter