import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import phonebook from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  // get persons
  useEffect(() => {
    phonebook.getAll().then((fetchedPhonebook) => {
      setPersons(fetchedPhonebook);
    });
  }, [persons]);

  // add person
  const addPerson = (e) => {
    e.preventDefault();
    const check = persons.some((person) => person.name === newName);
    if (check) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObj = {
        name: newName,
        number: newNumber,
      };
      phonebook.create(personObj).then((returnedPhonebook) => {
        setPersons(persons.concat(returnedPhonebook));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  // delete person
  const deletePerson = (person) => {
    window.confirm(`Delete ${person.name} ?`);
    phonebook
      .del(person.id)
      .then(() => {
        console.log(`Deleted ${person.name}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleNameInput = (e) => setNewName(e.target.value);
  const handleNumberInput = (e) => setNewNumber(e.target.value);
  const handleSearch = (e) => setSearch(e.target.value);

  // filter persons based on search query (case-insensitive)
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase()),
  );

  const finalPersonsList = search === "" ? persons : filteredPersons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch} />

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameInput={handleNameInput}
        handleNumberInput={handleNumberInput}
      />

      <h3>Numbers</h3>
      <Persons
        finalPersonsList={finalPersonsList}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
