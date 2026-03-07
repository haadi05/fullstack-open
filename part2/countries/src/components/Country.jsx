const Country = ({ result }) => {
  return (
    <div>
      <h1>{result.name.common}</h1>
      <p>Capital {result.capital}</p>
      <p>Area {result.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(result.languages).map((language) => {
          return <li key={language}>{language}</li>;
        })}
      </ul>
      <img src={result.flags.png} alt={result.flags.alt} />
    </div>
  );
};

export default Country;
