import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Movie.css";
import { getMovies, getCurrentMovies, getUpcomingMovies } from "../functionality/movie";

function Movie() {
  const [movies, setMovies] = useState([]);
  const [selectedSection, setSelectedSection] = useState("currentlyShowing");
  const [hoveredMovieId, setHoveredMovieId] = useState(null);
  const [trailerTimeout, setTrailerTimeout] = useState(null);

  const changeSection = (section) => {
    if (section == "currentlyShowing") {
      getCurrentMovies().then((moviesData) => {
        setMovies(moviesData);
      })
    }
    else {
      getUpcomingMovies().then((moviesData) => {
        setMovies(moviesData);
      })
    }
  };

  useEffect(() => {
    if (selectedSection == "currentlyShowing") {
    getCurrentMovies().then((moviesData) => {
      setMovies(moviesData);
    })
  }
  else {
    getUpcomingMovies().then((moviesData) => {
      setMovies(moviesData);
    })
  }
  }, []);

  const handleMouseEnter = (movie_id) => {
    if (trailerTimeout) {
      clearTimeout(trailerTimeout);
      setTrailerTimeout(null);
    }
    setHoveredMovieId(movie_id);
  };

  const handleMouseLeave = () => {
    const timeoutId = setTimeout(() => {
      setHoveredMovieId(null);
    }, 5000); // delay before trailer dissapears 
    setTrailerTimeout(timeoutId);
  };

  return (
    
    <div className="movie">
      <div className="headers">
        <h1 className={selectedSection === "currentlyShowing" ? "active" : ""} onClick={() => changeSection("currentlyShowing")}>
          Currently Running
        </h1>
        <h1 className={selectedSection === "comingSoon" ? "active" : ""} onClick={() => changeSection("comingSoon")}>
          Coming Soon
        </h1>
      </div>
      <hr className="divider" />
      <div className="movies-container">
      {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.movie_id} className="movie-card"
              onMouseEnter={() => handleMouseEnter(movie.movie_id)}
              onMouseLeave={handleMouseLeave}>
              <h2>{movie.movie_title}</h2>
              <Link to={`/movie-details/${movie.movie_id}`}>
                <img src={movie.picture} alt={movie.movie_title} />
              </Link>
            </div>
          ))
        ) : (
          <p>Loading movie details...</p>
        )}
      </div>
      {hoveredMovieId && (
        <div className="trailer" onMouseEnter={() => clearTimeout(trailerTimeout)} onMouseLeave={handleMouseLeave}>
          <iframe
            width="560"
            height="315"
            src={movies.find(movie => movie.movie_id === hoveredMovieId)?.trailer}
            title="YouTube Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default Movie;
