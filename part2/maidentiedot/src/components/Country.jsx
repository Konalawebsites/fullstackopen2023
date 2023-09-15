import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {

  const [temperatureCountry, setTemperatureCountry] = useState('')
  const [windCountry, setWindCountry] = useState('')
  const [weatherIcon, setWeatherIcon] = useState('')

  const api = 'fc6ece241d417c34988d2f38c75770cc'
    useEffect(() => {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${api}`)
        .then(weather => {
          console.log('weather:', weather.data)
          setTemperatureCountry( weather.data.main.temp)
          setWindCountry(weather.data.wind.speed)
          setWeatherIcon(`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`)
        })
    }, [])


  return (
    <div>
      <h3> {country.name.common} </h3>
      <p> capital city: {country.capital[0]} </p>
      <p> population: {country.area} </p>
      <ul>
        <b> languages </b>
        {Object.values(country.languages).map(language =>
          <li key={language}> {language} </li>
        )}
      </ul>

      <img src={country.flags.png} />

      <h3> weather in {country.capital[0]} </h3>
          <p> temperature {temperatureCountry - 273.15} </p>
          <img src={weatherIcon} />
          <p> wind {windCountry} m/s </p>
    </div>
  )
}

export default Country