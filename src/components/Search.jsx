import React, { useState } from "react";
import "./Search.css";
import { Link } from "react-router-dom";

function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const movies = [
    { name: "KungFuPanda4", 
      type: "Coming Soon",
    },
    { name: "Cats",
      type: "Currently Showing",
     },
  ];

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    const results = movies.filter((movie) =>
      movie.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for movies..."
        onChange={handleChange}
        value={searchInput}
      />

      <button className = "search-button" onClick={handleSearch}>Search</button>

      {/* Shows the link to view cat movie details */}
      {searchResults.length > 0 && searchResults[0].name === "Cats" && (
        <div>
          <Link to="/cat-movie-details">
            <p>Cats</p>
          </Link>
        </div>
      )}

      {/* Prompts user that we do not have the movie!! does not work */}
      {searchResults.length > 0 && searchResults[0].name !== "Cats" && (
        <div>
          <p>Sorry, we do not have that movie yet!</p>
        </div>
      )}

</div>

  );
}

export default Search;
