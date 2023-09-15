import { useState } from "react"

const Persons = ({ personsToShow, removePerson }) => {
  return (
    <div>
      {personsToShow.map(person =>
        <li key={person.name}>
          {person.name} {person.number}
          <button onClick={() => removePerson(person) }>remove this guy</button></li>
      )}
    </div>
  )
}

export default Persons