const Persons = ({ finalPersonsList, deletePerson }) => {
  return (
    <ul>
      {finalPersonsList.map((person) => {
        return (
          <li key={person.name}>
            {person.name} {person.number}{" "}
            <button
              onClick={() =>
                window.confirm(`Delete ${person.name} ?`) &&
                deletePerson(person)
              }
            >
              delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Persons;
