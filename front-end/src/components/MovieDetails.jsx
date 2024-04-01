import React, { useState, useEffect } from "react";
import "./MovieDetails.css";
import MovieCard from "./MovieCard";

const MovieDetails= (props) => {
  const [movies, setMovies] = useState([]);

    return (
      <div>
       {movies.map((movie, index) => (
       <MovieCard
          key={index}
          imageUrl={movie.imageUrl} 
          altText={movie.name}
          title={movie.name}
          trailerUrl={movie.trailerUrl}
          link={movie.link}
          isSelected={index === currentIndex} 
         />
))}
      </div>
    );
  };
  
  export default MovieDetails;
  