import React, { useState } from "react";
import { Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firestore";
import "./Search.css"; // Import CSS file for styling
function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [hover, setHover] = useState(false);
  const [movie, setMovie] = useState(null);
  const [movieGetID, setMovieID] = useState(null);
  const handleSearch = async () => {
    try {
      const movieCollection = collection(db, "movie");
      const q = query(movieCollection, where("movie_title", "==", searchInput));
      const docReturn = await getDocs(q);
      
      if (!docReturn.empty) {
        // setMovie to first matching doc
        const movieData = docReturn.docs[0].data();
        const movieID = docReturn.docs[0].id;
        
        setMovie({
          id: movieID,
          ...movieData
        });
        
        // setMovie(movieData);
        // const moviesData = docReturn.docs.map((doc) => ({
        //   id: doc.id,
        //   ...doc.data(),
        // }));
        // setMovies(moviesData);

        // const movieData = docReturn.docs[0];
        // setMovie(movieData);
        // const movieGetID = {
        //   id: movieData.id,
        //   ...movieData.data()
        // };
        
        // Add movie into the searchResult array
        setSearchResults(docReturn.docs.map((doc) => doc.data()));
        setSearched(true);
      } else { //Movie not found
        setMovie(null);
        setSearchResults([]);
        setSearched(true);
        console.log("Movie not found");
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
    setSearched(false); // Reset searched state when input changes
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
      <div>
        {movie ? (
          <div>
            {/* <Link to={`/movie-details/${movieGetID.id}`}> */}
            {/* <Link key={movie.name} to={`/movie-details/${movie.id}`} className="search-result"> */}
            <Link to={`/movie-details/${movie.id}`} className="search-result">
              <div>
                <h3>{movie.movie_title}</h3>
              
                {/* Add more movie details as needed */}
                {/*             <Link to={`/movie-details/${movie.id}`}>
              <img src={movie.picture} alt={movie.movie_title} />
            </Link>  */}

              </div>
            </Link>
            <p>Rating: {movie.rating}</p>
            <p>Trailer: 
              <button> 
                 {movie.trailer} 
              </button>
            </p>
          </div>
        ) : searched ? (
          <p>No movie found</p>
        ) : (
          <p> </p>
        )}
      </div>
    </div>
  );
}
export default Search;

