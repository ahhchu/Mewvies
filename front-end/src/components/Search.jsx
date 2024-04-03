import React, { useEffect, useState } from "react";
import "./Search.css";
import "./Button.css";
import Button from "./Button";
import { Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/firestore";

function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searched, setSearched] = useState(false); 
  const [hover, setHover] = useState(false);

  //Hardcoded Movies
  /** 
  const movies2 = [
    { name: "Kung Fu Panda 4" },
    { name: "Desciple Me 4" },
    { name: "Inside Out 2" },
    { name: "Sonic the Hedgehog 3" },
    { name: "Imaginary" },
  ];
  const movies = [
    { name: "Cats" },
    { name: "Mean Girls" },
    { name: "Everything Everywhere All At Once" },
    { name: "Saltburn" },
    { name: "Dilwale" },
  ];
  */


  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    
    // const results = movies.filter((movie) =>
    //   movie.name.toLowerCase().includes(searchInput.toLowerCase())
    // );
    // setSearchResults(results);
    // setSearched(true);



  };

//Using Fetch API? - Probs won't use
  // useEffect(() => {
  //   if (searchInput.length > 0) { //If anything is typed in the text box
  //     fetch()
  //   }

  // }, [searchInput])

  
  return (
    <div className={`search-container ${searchInput || hover ? "active" : ""}`}>
    <input
      type="text"
      placeholder="Search for movies..."
      onChange={(e) => setSearchInput(e.target.value)}
      value={searchInput}
      className="search-bar"
    />
    <button
      className="search-button"
      onClick={handleSearch}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      Search
    </button>



     {searched && searchResults.length > 0 && (
        <div>
          {searchResults.map((movie) => (
            <Link key={movie.name} to={`${movie.name}-movie-details`}>
              {"Currently Running: " + movie.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
