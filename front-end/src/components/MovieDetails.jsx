import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./MovieDetails.css";
import MovieCard from "./MovieCard";

function MovieDetails() {
    return (
      <div>
       <MovieCard
          key={index}
          imageUrl={show.imageUrl} 
          altText={show.name}
          title={show.name}
          trailerUrl={show.trailerUrl}
          link={show.link}
          isSelected={index === currentIndex} 
         />
      </div>
    );
  }
  
  export default MovieDetails;
  