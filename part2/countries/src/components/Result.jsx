import Country from "./Country";

const Result = ({ countries, search }) => {
  const result = countries.filter((country) => {
    return country.name.common.toLowerCase().includes(search.toLowerCase());
  });

  if (search === "") return;

  if (result.length === 0) {
    return <p>No match found</p>;
  }

  if (result.length === 1) {
    return <Country result={result[0]} />;
  }

  if (result.length >= 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (result.length <= 10) {
    return (
      <div>
        {result.map((result) => {
          return <p key={result.name.common}>{result.name.common}</p>;
        })}
      </div>
    );
  }
};
export default Result;
