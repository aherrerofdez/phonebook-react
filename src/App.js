import './App.css';
import { useState } from 'react';

function App() {

   const [people, setPeople] = useState([
     {name: 'Aino Korhonen', number: '+358 50 123 45 67', id: 1},
     {name: 'Antti Koskinen', number: '+358 50 213 54 76', id: 2},
     {name: 'Emma Virtanen', number: '+358 50 321 45 76', id: 3}, 
     {name: 'Juho Mattila', number: '+358 50 231 54 67', id:4},
     {name: 'Mikko Stenvall', number: '+358 50 217 34 64', id: 5}, 
     {name: 'Roosa Karhu', number: '+358 50 654 45 54', id:6}
   ])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const addContact = (event) => {
    event.preventDefault()
    const contacts = people.map(a => a.number.replace(/\s/g,''))
    if (contacts.indexOf(newNumber.replace(/\s/g,'')) > -1) {
      alert('This phone number is already in the phonebook')
    }
    else {
      if (newName.length !== 0) {
        const contactObj = {
          name: newName,
          number: newNumber,
          id: people.length + 1
        }
        setPeople(people.concat(contactObj))
        setSearch('')
        setNewName('')
        setNewNumber('')
      }
      else {
        alert('Name cannot be empty')
      }
    }
  }

  const filterNames = (peopleList, searchField) => {
    if (searchField === '') {
      return people
    }
    else {
      const names = peopleList.map(elem => elem.name.toLowerCase().replace(/\s/g,''))
      const numbers = peopleList.map(elem => elem.number.toLowerCase().replace(/\s/g,''))
      const results = []
      for  (let n in names) {
        if (names[n].includes(searchField.toLowerCase().replace(/\s/g,'')) ||
            numbers[n].includes(searchField.toLowerCase().replace(/\s/g,''))) {
          results.push(peopleList[n])
        }
      }
      return results
    }
  }

  const handleContactChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <div>
        <h2>Phonebook</h2>
      </div>
      
      <div>
        <label> Search: </label>
        <input placeholder='Search for contacts'
               value={search}
               onChange={handleFilter} />
      </div>

      <form onSubmit={addContact}>
        <div>
          <label> Name: </label>
          <input placeholder='New contact name'
                 value={newName}
                 onChange={handleContactChange} />
        </div>
        <div>
          <label> Phone number: </label>
          <input placeholder='New phone number'
                 value={newNumber}
                 onChange={handleNumberChange} />
        </div>
        <div>
          <button type='submit'> Add Contact </button>
        </div>
        <div>
          <h2> Contacts </h2>
        </div>
        <div>
          <p><b>{people.length}</b> contacts in the phonebook</p>
        </div>
        <div>
          <ul>
            {filterNames(people, search).map(
              elem =>
              <li key={elem.id}>{elem.name}{' '}{elem.number}</li>
            )}
          </ul>
        </div>
      </form>
    </div>
  );
}

export default App;
