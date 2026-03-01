import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addPerson = (e) => {
    e.preventDefault();

    const check = persons.some((person) => person.name === newName);

    if (check) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObj = {
        name: newName,
      };
      setPersons(persons.concat(personObj));
      setNewName("");
    }
  };

  const handleInput = (e) => setNewName(e.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => {
          return <li key={person.name}>{person.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default App;
