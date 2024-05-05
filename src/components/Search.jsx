import React, { useState } from "react";
import { Link } from "react-router-dom";
import { collection, query, getDocs } from "firebase/firestore";
import { db, Timestamp } from "../config/firestore";
import "./Search.css"; 

function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [hover, setHover] = useState(false);

  const handleSearch = async () => {
    try {
      const movieCollection = collection(db, "movie");
      const q = query(movieCollection);
      const docReturn = await getDocs(q);
      const searchLower = searchInput.toLowerCase();
      const currentDate = new Date();

      const filteredMovies = docReturn.docs.filter((doc) => {
        const data = doc.data();
        const titleMatch = data.movie_title.toLowerCase().includes(searchLower);
        const categoryMatch = data.category
          .toLowerCase()
          .split(", ")
          .some((category) => category.includes(searchLower));
        return titleMatch || categoryMatch;
      }).map((doc) => ({
        id: doc.id,
        ...doc.data(),
        // Determine if the movie is upcoming or currently showing
        status: doc.data().opening_date.toDate() > currentDate ? "Coming Soon" : "Now Showing"
      }));

      setSearchResults(filteredMovies);
      setSearched(true);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
      setSearched(true);
    }
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
    setSearched(false); 
  };

  const handleClose = () => {
    setSearchResults([]);
    setSearched(false);
    setSearchInput(""); 
  };

  return (
    <div className={`search-container ${searchInput || hover ? "active" : ""}`}>
      <input
        type="text"
        placeholder="Search for movies..."
        onChange={handleChange}
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
      {searched && (
        <button className="close-button" onClick={handleClose}>
          Close
        </button>
      )}
      <div>
        {searched && searchResults.length > 0 ? (
          searchResults.map((movie) => (
            <div key={movie.id}>
              <div>
                <p>{movie.status}</p>
              <br/>
                <Link
                  to={`/movie-details/${movie.movie_id}`}
                  className="search-result"
                >
                  <h3>{movie.movie_title}</h3>
                </Link>
                <p>Rating: {movie.rating}</p>
                <p>Trailer:</p>
                <iframe
                  src={movie.trailer}
                  title="Movie Trailer"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ width: "100%", height: "300px" }}
                ></iframe>
              </div> < br/> <br/>
            </div> 
          ))
        ) : searched ? (
          <p>No movie found</p>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}

export default Search;
