import React, { useState } from "react";
import "./Search.css";
import { Link } from "react-router-dom";

function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const movies = [
    { name: "KungFuPanda4", 
      type: "Coming Soon",
      img: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcShXRgSAV3GrlVrpvGcLLaEmue2hAvF1BH3YP3BRyX6m1L1MIxjjWH0EkfHn7XTMqidJG_c_g",
    },
    { name: "Cats",
      type: "Currently Showing",
      img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fencrypted-tbn0.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcTlhjCq92hLSM8SQ8LQY-T36pohncVV7Fhsjx3X69pEarYVe_hO&psig=AOvVaw33QSEZ0Qk-usIcW6z1GWfB&ust=1708628352705000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNDYw-GOvYQDFQAAAAAdAAAAABAE",
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
    <div>
      <input
        type="text"
        placeholder="Search for movies..."
        onChange={handleChange}
        value={searchInput}
      />
      <button onClick={handleSearch}>Search</button>

      {searchResults.length > 0 && (
        <ul>
          {searchResults.map((result, index) => (
            <li key={index}>
              <Link to={`/movies/${result.name}`}>{result.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
