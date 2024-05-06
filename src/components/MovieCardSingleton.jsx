import React, { useState } from "react";
import configManager from './ConfigManager'; // singleton 

function MovieCardSingleton({
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
}) {
  const [detailsVisible, setDetailsVisible] = useState(false);
  
  // Use the singleton to get a configuration value
  const apiUrl = configManager.get('apiUrl');

  return (
    <div>
      <img src={imageUrl} alt={altText} width="300" onClick={() => setDetailsVisible(!detailsVisible)} />
      <h1>{title}</h1>
      {detailsVisible && (
        <>
          <h3>Category: {category}</h3>
          <h3>Cast: {cast}</h3>
          <h3>Director: {director}</h3>
          <h3>Producer: {producer}</h3>
          <h3>Synopsis: {synopsis}</h3>
          <h3>Reviews: {reviews}</h3>
        </>
      )}
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
        <a href={`${apiUrl}/book?movieId=${title}`}>
          <button className="trailer-button">Book Movie</button>
        </a>
      </div>
    </div>
  );
}

export default MovieCardSingleton;
