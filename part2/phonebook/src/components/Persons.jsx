const Persons = ({ finalPersonsList }) => {
  return (
    <ul>
      {finalPersonsList.map((person) => {
        return (
          <li key={person.name}>
            {person.name} {person.number}
          </li>
        );
      })}
    </ul>
  );
};

export default Persons;
