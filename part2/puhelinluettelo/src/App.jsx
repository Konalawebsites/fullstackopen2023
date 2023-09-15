import { useState, useEffect } from 'react'
import FilterForm from './components/FilterForm'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import axios from 'axios'
import personService from './services/persons'
import './index.css'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'telephone contacts')

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
    }

    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName)
        const changedPerson = { ...person, number: newNumber }

        setIsError(false)
        setNotificationMessage(
          `${newName}'s number has changed to Phonebook`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)

        personService
          .update(changedPerson.id, changedPerson).then(returnedData => {
            setPersons(persons.map(person => person.name !== newName ? person : changedPerson))
          })
          .catch(error => {
            setIsError(true)
            setNotificationMessage(
              `Person '${person.name}' was already removed from server`
            )
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
      }
      setNewName('')
      setNewNumber('')
      return
    }

    personService
      .create(personObject)
      .then(foundPerson => {
        setPersons(persons.concat(foundPerson))
        setNewName('')
        setNewNumber('')
      })

    setIsError(false)
    setNotificationMessage(
      `${newName} added to Phonebook`
    )
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const removePerson = (person) => {
    personService
      .remove(person.id)
      .then(foundPerson => {
        setIsError(false)
        setNotificationMessage(
          `Person '${person.name}' was succesfully removed`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
        setPersons(persons.filter(x => x.id !== person.id))
      })
      .catch(error => {
        setIsError(true)
        setNotificationMessage(
          `Person '${person.name}' was already removed from server`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
        setPersons(persons.filter(x => x.id !== person.id))
      })
  }

  const personsToShow = newFilter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} isError={isError} />
      <FilterForm newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange} addPerson={addPerson} />
      <h2>Numbers</h2>

      <Persons personsToShow={personsToShow} removePerson={removePerson} />
    </div>
  )
}

export default App