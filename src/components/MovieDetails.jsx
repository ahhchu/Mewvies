import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../config/firestore";
import { doc, getDoc } from "firebase/firestore";
import Button from "./Button";
import { Link } from "react-router-dom";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const docRef = doc(db, "movie", movieId); // Make sure the collection name is correctly specified
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setMovie(docSnap.data());
        console.log("Document data:", docSnap.data()); // This will log the fetched data
      } else {
        console.log("No such document!");
      }
    };

    fetchMovie();
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
          <Link to="/seats">
            <Button>Buy Tickets here</Button>
          </Link>
        </div>
      ) : (
        <p>Loading movie details...</p>
      )}
    </div>
  );
};

export default MovieDetails;
