require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

const Person = require('./models/person')

const morgan = require('morgan')
morgan.token('body', req => { return JSON.stringify(req.body) })

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use('/', express.static('/dist'))

const generateId = () => {
  return Math.floor(Math.random() * 1000)
}

const myDate = new Date()

app.get('/info', (req, res) => {
  Person.find({}).then(persons => {
    res.json(
      `Phonebook has info for ${persons.length} people ---- ${myDate}`)
  }
  )
})

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(persons => {
      response.json(persons)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {

  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      }
      else { response.status(404).end() }
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (body.name === '' || body.number === '') {
    return response.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    id: generateId(),
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch( error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// tämä tulee kaikkien muiden middlewarejen rekisteröinnin jälkeen!

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
