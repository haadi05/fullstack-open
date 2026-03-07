const Search = ({ search, handleSearch }) => {
  return (
    <div>
      find countries{" "}
      <input value={search} onChange={handleSearch} type="text" />
    </div>
  );
};

export default Search;
