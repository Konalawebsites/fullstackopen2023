const express = require('express')
const morgan = require('morgan')
const app = express()

morgan.token('body', req => { return JSON.stringify(req.body) })

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const generateId = () => {
    return Math.floor(Math.random() * 1000);
}

const myDate = new Date();

let persons = [
    {
        id: 1,
        name: "TUutikki",
        number: "050-2121221"
    },
    {
        id: 2,
        name: "Tousti Tuuras",
        number: "054-12312321"
    },
    {
        id: 3,
        name: "Valumees",
        number: "010-1214124"
    }
]

app.get('/info', (req, res) => {
    res.send(
        `<p> Phonebook has info for ${persons.length} people </p>
        ${myDate}`
    );
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => {
        console.log(person.id, typeof person.id, id, typeof id, person.id === id)
        return person.id === id
    })
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name and/or number missing'
        })
    }

    const checkUsername = person => person.name === body.name;
   
    if (persons.some(checkUsername)) {
        return response.status(400).json({
            error: 'name is already on the phonebook - please try different name'
        })
    }

    const person = {
        name: body.name,
        number: body.number || false,
        id: generateId(),
    }

    persons = persons.concat(person)

    response.json(person)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
