import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Button from "./Button";
import { getMovies } from "../functionality/movie";
import { getShowingsByMovie, getShowings} from "../functionality/showing";
import "./MovieDetails.css";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [showings, setShowings] = useState([]);
  const [hasReviews, setHasReviews] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const movies = await getMovies();
      const movieData = movies.find(element => element.movie_id === movieId);
      if (movieData) {
        setMovie(movieData);
        setHasReviews(Boolean(movieData.review1));
      }

      const showingsData = await getShowings();
      setShowings(showingsData);
    }

    fetchData();
  }, [movieId]);

  return (
    <div>
      {movie ? (
        <div>
          <h1>{movie.movie_title}</h1>
          <img src={movie.picture} alt={movie.movie_title} />
          <p>{movie.synopsis}</p>
          <p>Director: {movie.director}</p>
          <p>Producer: {movie.producer}</p>
          <p>Cast: {movie.cast}</p>
          <p>Category: {movie.category}</p>
          <p>MPAA-US code: {movie.rating}</p>
          <iframe
            width="560"
            height="315"
            src={movie.trailer}
            title="Movie Trailer"
            frameBorder="0"
            allowFullScreen
          ></iframe>

          {hasReviews && (
            <>
              <h2>Reviews</h2>
              <p>{movie.review1}</p>
              <p>{movie.review2}</p>
              <p>...</p>
            </>
          )}

          <h2>Showing Times</h2>
          {showings.length > 0 ? (
            showings.map(show => (
              <Link key={show.showing_id} to="/seats">
                <button className ="showing">{new Date(show.showing_time.seconds).toString()}</button>
              </Link>
            ))
          ) : <p>No showings available.</p>}
        </div>
      ) : (
        <p>Loading movie details...</p>
      )}
    </div>
  );
};

export default MovieDetails;
