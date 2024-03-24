import React from "react";
import "./CatMovieDetails.css";

function MovieCard({
  imageUrl,
  altText,
  title,
  category,
  cast,
  director,
  producer,
  synopsis,
  reviews,
  trailerUrl,
  playTrailer,
  rating,
  bookMovieLink,
}) {
  return (
    <div>
      <img src={imageUrl} alt={altText} width="300" />
      <h1>{title}</h1>
      <h3>Category: {category}</h3>
      <h3>Cast: {cast}</h3>
      <h3>Director: {director}</h3>
      <h3>Producer: {producer}</h3>
      <h3>Synopsis: {synopsis}</h3>
      <h3>Reviews: {reviews}</h3>
      <div className="TrailerContainer">
        <iframe
          width="560"
          height="315"
          src={trailerUrl}
          title="YouTube Trailer"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      <button className="trailer-button" onClick={playTrailer}>
        Play Trailer
      </button>
      <h3>MPAA-US film rating code: {rating}</h3>
      <div className="showtimes">
        <a href={bookMovieLink}>
          <button className="trailer-button">Book Movie</button>
        </a>
      </div>
    </div>
  );
}

export default MovieCard;
