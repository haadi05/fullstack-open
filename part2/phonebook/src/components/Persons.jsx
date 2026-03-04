const Persons = ({ finalPersonsList, deletePerson }) => {
  return (
    <ul>
      {finalPersonsList.map((person) => {
        return (
          <li key={person.name}>
            {person.name} {person.number}{" "}
            <button onClick={() => deletePerson(person)}>delete</button>
          </li>
        );
      })}
    </ul>
  );
};

export default Persons;
