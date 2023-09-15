import Country from './Country'

const Countries = ({countriesShown, handleClick}) => {
  console.log(countriesShown.length)
    return (
      <div>

          {(countriesShown.length >= 10 || countriesShown.length === 0) &&
          <p className='tips'> too many hits.. type something to filter </p>
          }


          {countriesShown.length > 1 && countriesShown.length < 10 &&
          countriesShown.map(country => 
              <div key={country.name.common}>
                  <p key={country.name.common}>{country.name.common} <button onClick={ () => handleClick(country)}> show</button> </p> 
              </div>
          )
          }

          {countriesShown.length === 1 &&
          <Country country={countriesShown[0]} />
}
    
      </div>
  )}

  export default Countries