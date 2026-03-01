const PersonForm = ({
  addPerson,
  newName,
  newNumber,
  handleNameInput,
  handleNumberInput,
}) => {
  return (
    <form onSubmit={addPerson}>
      <h3>Add</h3>
      <div>
        name: <input value={newName} onChange={handleNameInput} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberInput} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
