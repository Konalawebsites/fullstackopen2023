import { useState, useEffect } from 'react'
import FilterForm from './components/FilterForm'
import Countries from './components/Countries'
import './index.css'
import axios from 'axios'


const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [countriesShown, setCountriesShown] = useState('')
  const [allCountries, setAllCountries] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])


  const handleFilterChange = (event) => {
    setCountriesShown(allCountries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase())))
    setNewFilter(event.target.value)
  }

  const handleClick = (country) => {
    setCountriesShown([country])
  }
  
  return (
    <div>
      <h1>Country info application</h1>
      <FilterForm newFilter={newFilter} handleFilterChange={handleFilterChange} />
      
      <Countries countriesShown={countriesShown} handleClick={handleClick}/>

    </div>
  )

}
export default App