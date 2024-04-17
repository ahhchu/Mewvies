import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../config/firestore";
import { collection, getDocs } from "firebase/firestore";
import "./Movie.css";

function Movie() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesRef = collection(db, "movie"); // Ensure collection name is correct
        const querySnapshot = await getDocs(moviesRef);
        const moviesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMovies(moviesData);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="movies-container">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <h2>{movie.movie_title}</h2>
            <Link to={`/movie-details/${movie.id}`}>
              <img src={movie.picture} alt={movie.movie_title} />
            </Link>
            <div className="trailer">
              <iframe
                width="560"
                height="315"
                src={movie.trailer}
                title="YouTube Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ))
      ) : (
        <p>Loading movie details...</p>
      )}
    </div>
  );
}

export default Movie;
