import React, { useEffect, useState } from "react";
import "./Search.css";
import "./Button.css";
import Button from "./Button";
import { Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firestore";

function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searched, setSearched] = useState(false); 
  const [hover, setHover] = useState(false);


 


  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = async () => {
  

    try{
      //Searches the DB for the Movie Title
      const movieCollection = collection(db, 'movie');
      const q = query(movieCollection, where('movie_title', '==', searchInput));
      const docReturn = await getDocs(q);
      const exists = !docReturn.empty;
  
      //Changes "searched" if found
      //setSearchResults(results);
      setSearched(exists);
      
      if (exists) {
        //Return Link to the Movie since it exists
        console.log("searched is: " + searched);
      }

    } catch {
      console.error("Error fetching search results:", error);
    }
    
    

  };

  
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
