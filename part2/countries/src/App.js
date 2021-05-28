import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Filter = (props) => {
  return (
    <input value={props.filter} onChange={props.handleFilterChange} />
  )
}

const filterCountries = (countries, filter) => {
  const filteredCountries = []
  countries.forEach(country => {
    if( country.name.toLowerCase().indexOf(filter.toLowerCase()) === 0 ) {
      filteredCountries.push(country)
    }
  })
  return filteredCountries
}

const Countries = (props) => {
  var filteredCountries = filterCountries(props.countries, props.filter)
  if(props.filter==='') {
    return (
      <div>Specify country filter</div>
    )
  } else if(filteredCountries.length>10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  } else if (filteredCountries.length<10 && filteredCountries.length>1) {
    return (
      <ul>
        {filteredCountries.map(country => 
          <Country key={country.name} country={country} handleCountry={props.handleCountry} />
        )} 
      </ul>  
    )  
  } else if (filteredCountries.length===1) {
    var languages = [...filteredCountries[0].languages]
    return (
      <div>
      <h1>{filteredCountries[0].name}</h1>
      <ul>
        Capital: {filteredCountries[0].capital} <br />
        Population: {filteredCountries[0].population} <br />
        Languages: {languages.map(language=><div key={language.name}>{language.name}</div>)} <br />
        Flag: <img src={filteredCountries[0].flag} alt="flag" /> <br /><br />
        
      </ul>
      </div>  
    )
  } else {
    return (
      <div>Unmatched countries</div>
    )
  }
}

const Weather = (props) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=${process.env.REACT_APP_API_KEY}`)
      .then(response => {
          return (
            <div>
              {response.data.weather.main} {response.data.weather.description} <br />
              Temp:{response.data.main.temp} Humidity:{response.data.main.humidity} <br />
              Wind:{response.data.wind.speed} Cloudiness {response.data.clouds.all}% <br />
            </div>
          )
      })
}

const Country = (props) => {
  return (
      <li> 
        {props.country.name} <button value={props.country.name} onClick={props.handleCountry}>show</button> <br />
      </li>
  )
}


const App = () => { 

  const [ countries, setCountries ] = useState([]) 
  const [ filter, setNewFilter ] = useState('')
  
  useEffect(() => {
    if(filter.length>0) {
      axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          setCountries(response.data)
        })
    }
  }, [filter])

  
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  
  const handleCountry = (event) => {
    setNewFilter(event.target.value)
  }
  

  return (
    <div>      
      <p>Find countries:
        <Filter handleFilterChange={handleFilterChange} filter={filter} /> <br />
      </p>
        <Countries countries={countries} filter={filter} handleCountry={handleCountry} />
    </div>
  )
}


export default App