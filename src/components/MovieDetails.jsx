import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "./Button";
import { Link } from "react-router-dom";
import { getMovies } from "../functionality/movie";
import "./MovieDetails.css"

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovies().then((data) => {
      console.log(data);
      data.forEach(element => {
        if (element.movie_id == movieId) {
          setMovie(element);
        }
      });
    })
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
          <p>Rating: {movie.rating}</p>
          <iframe
            width="560"
            height="315"
            src={movie.trailer}
            title="Movie Trailer"
            frameBorder="0"
            allowFullScreen
          ></iframe>

          <br />
          <br/>
          <br/>
          <h2>Showing Times</h2>
          <Link to="/seats">
          <button className="showing">12:00 PM</button>
            <button className="showing">3:00 PM</button>
            <button className="showing">6:30 PM</button>
            <button className="showing">9:30 PM</button>
          </Link>
        </div>
      ) : (
        <p>Loading movie details...</p>
      )}
    </div>
  );
};

export default MovieDetails;
