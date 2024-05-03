import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../functionality/User";
import { getMovies } from "../functionality/movie";
import { getShowingsByMovie, getShowings } from "../functionality/showing";
import "./MovieDetails.css";

const MovieDetails = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [showings, setShowings] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const movies = await getMovies();
      const movieData = movies.find(element => element.movie_id === movieId);
      if (movieData) {
        setMovie(movieData);
        console.log("Movie Name: ", movieData.movie_title);
      }

      const showingsData = await getShowingsByMovie(movieId);
      console.log(showingsData);
      setShowings(showingsData);
    }

    fetchData();
  }, [movieId]);

  const handleRedirect = async (e) => {
    if(isLoggedIn() == false) {
      navigate('/login');
    } else {
      navigate('/seats');
    }
  }

  return (
    <div>
      {movie ? (
        <div>
          <div className="movie-details">
            <h1>{movie.movie_title}</h1>
            <img src={movie.picture} alt={movie.movie_title} />
            <p>{movie.synopsis}</p>
            <p>Director: {movie.director}</p>
            <p>Producer: {movie.producer}</p>
            <p>Cast: {movie.cast}</p>
            <p>Category: {movie.category}</p>
            <p>MPAA-US code: {movie.rating}</p>
          </div>
          <iframe
            width="560"
            height="315"
            src={movie.trailer}
            title="Movie Trailer"
            frameBorder="0"
            allowFullScreen
          ></iframe>

          <div className="reviews">
            {movie.review1 && (
              <>
                <h2>Reviews</h2>
                <p>{movie.review1}</p>
                <p>{movie.review2}</p>
                <p>...</p>
              </>
            )}
          </div>
          
          <h2>Showing Times</h2>
          {showings.length > 0 ? (
            showings.map(show => (
                <button className ="showing" onClick={handleRedirect}>{new Date(show.showing_time.seconds).toString()}</button>
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
