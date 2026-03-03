import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((res) => {
      setPersons(res.data);
    });
  }, []);

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
      axios.post("http://localhost:3001/persons", personObj).then((res) => {
        setPersons(persons.concat(res.data));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleNameInput = (e) => setNewName(e.target.value);
  const handleNumberInput = (e) => setNewNumber(e.target.value);
  const handleSearch = (e) => setSearch(e.target.value);

  // filter persons based on search query (case-insensitive)
  const personstoShow = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase()),
  );

  const finalPersonsList = search === "" ? persons : personstoShow;

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
      <Persons finalPersonsList={finalPersonsList} />
    </div>
  );
};

export default App;
