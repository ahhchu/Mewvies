import React, { useState } from "react";
import "./Search.css";
import { Link } from "react-router-dom";

function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searched, setSearched] = useState(false); 

  const movies = [
    { name: "Cats" },
    { name: "Mean Girls" },
    { name: "Everything Everywhere All At Once" },
    { name: "Saltburn" },
    { name: "Dilwale" },
  ];

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    const results = movies.filter((movie) =>
      movie.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSearchResults(results);
    setSearched(true);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for movies..."
        onChange={handleChange}
        value={searchInput}
      />

      <button className="search-button" onClick={handleSearch}>
        Search
      </button>

     {searched && searchResults.length > 0 && (
        <div>
          {searchResults.map((movie) => (
            <Link key={movie.name} to={`${movie.name}-movie-details`}>
              {movie.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
