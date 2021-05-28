import React, { useState, useEffect } from 'react'
import axios from 'axios'


const filterPersons = (persons, filter) => {
  const filteredPersons = []
  persons.forEach(person => {
    if( person.name.toLowerCase().indexOf(filter.toLowerCase()) === 0 ) {
      filteredPersons.push(person)
    }
  })
  return filteredPersons
}

const Filter = (props) => {
  return (
    <input value={props.filter} onChange={props.handleFilterChange} />
  )
}

const Persons = (props) => {
  var filteredPersons = filterPersons(props.persons, props.filter)
  return (
    <ul>
      {filteredPersons.map(person => 
        <Person key={person.name} persona={person} />
      )} 
    </ul>  
  )
}

const Person = ({persona}) => {
  return (
      <li> 
        {persona.name} : {persona.number}  <br />
      </li>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
    <div>
      name: <input type="text" value={props.newName} onChange={props.handleNameChange} />
      number: <input type="text" value={props.newNumber} onChange={props.handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}


const App = () => { 

  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Artos Fella', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }    
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setNewFilter ] = useState('')


  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  

  const addPerson = (event) => {
    event.preventDefault()
    if(newName===''||newNumber==='') {
      alert('name and number must not be empty!')
      return
    }      
    const personObject = {
      name: newName,
      number: newNumber
    }    
    if(persons.findIndex(x => x.name === newName)<0)
      setPersons(persons.concat(personObject))
    else
      alert(`${newName} is already added to phonebook`)
    setNewName('')
    setNewNumber('')
  }

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
      <p>filter names:
        <Filter handleFilterChange={handleFilterChange} filter={filter} /> <br />
      </p>
      <h2>add a new: </h2>
        <PersonForm newName={newName} newNumber={newNumber} addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
        <Persons persons={persons} filter={filter} />
    </div>
  )
}


export default App