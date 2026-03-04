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
  }, []);

  const addPerson = (e) => {
    e.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      const confirmed = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`,
      );

      if (!confirmed) return;

      //updating existing person
      const changedObj = {
        ...existingPerson,
        number: newNumber,
      };

      phonebook.update(existingPerson.id, changedObj).then((returned) => {
        setPersons(
          persons.map((person) =>
            person.id === existingPerson.id ? returned : person,
          ),
        );
      });
    } else {
      // adding person
      const personObj = {
        name: newName,
        number: newNumber,
      };

      phonebook
        .create(personObj)
        .then((returned) => {
          setPersons(persons.concat(returned));
          setNewName("");
          setNewNumber("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // delete person
  const deletePerson = (person) => {
    phonebook
      .del(person.id)
      .then(() => {
        setPersons((prev) => prev.filter((p) => p.id !== person.id));
      })
      .catch((err) => {
        console.log(err);
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
