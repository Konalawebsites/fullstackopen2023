const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
  .find({}).populate('blogs', { title: 1, author: 1 })

  response.json(users.map( user => user.toJSON()))
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  
  let users = await User.find({})
  users = users.map(u => u.toJSON())
  
  if (username === "" || password === "") {
    return response.status(400).json({ error: 'username or password missing' })
  } else if (password.length < 3) {
    return response.status(400).json({ error: 'password must be at least 3 characters' })
  } else if (users.find(user => user.username === username)) {
    return response.status(400).json({ error: 'username must be unique' })    
  }

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

usersRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = usersRouter