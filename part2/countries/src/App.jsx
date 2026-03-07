import { useState, useEffect } from "react";
import Search from "./components/Search";
import getAll from "./services/countries";
import Result from "./components/Result";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAll().then((response) => {
      setCountries(response);
    });
  }, []);

  const handleSearch = (e) => setSearch(e.target.value);

  return (
    <div>
      <Search search={search} handleSearch={handleSearch} />
      <Result countries={countries} search={search} setSearch={setSearch} />
    </div>
  );
};

export default App;
