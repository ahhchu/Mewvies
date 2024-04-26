import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "./Button";
import { Link } from "react-router-dom";
import { getMovies, updateMovieByField } from "../functionality/movie";

const EditMovie = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateMovieByField(movieId, {
      movie_title: movie.movie_title,
      category: movie.category,
      cast: movie.cast, 
      director: movie.director, 
      producer: movie.producer, 
      synopsis: movie.synopsis, 
      trailer: movie.trailer, 
      rating: movie.rating,
      picture: movie.picture,
      opening_date: movie.opening_date
  });    
    setIsEditing(false); // Turn off editing mode after submission
  };

  const enableEdit = () => setIsEditing(true);

  return (
    <div>
      {movie ? (
        <form onSubmit={handleSubmit}>
          <h1>Edit Movie Details</h1>
          {isEditing ? (
            <>
              <label>
                Movie Title:
                <input type="text" name="movie_title" value={movie.movie_title} onChange={handleChange} />
              </label>< br/>
              <label>
                Category:
                <input type="text" name="category" value={movie.category} onChange={handleChange} />
              </label>< br/>
              <label>
                Cast:
                <input type="text" name="cast" value={movie.cast} onChange={handleChange} />
              </label>< br/>
              <label>
                Director:
                <input type="text" name="director" value={movie.director} onChange={handleChange} />
              </label>< br/>
              <label>
                Producer:
                <input type="text" name="producer" value={movie.producer} onChange={handleChange} />
              </label>< br/>
              <label>
                Synopsis:
                <textarea name="synopsis" value={movie.synopsis} onChange={handleChange} />
              </label>< br/>
              <label>
                Trailer URL:
                <input type="text" name="trailer" value={movie.trailer} onChange={handleChange} />
              </label>< br/>
              <label>
                Rating:
                <input type="text" name="rating" value={movie.rating} onChange={handleChange} />
              </label> < br/>
              <label>
                Poster URL:
                <input type="text" name="picture" value={movie.picture} onChange={handleChange} /> 
              </label> < br/> 
              <Button type="submit">Save Changes</Button> < br/>
              <Button onClick={() => setIsEditing(false)}>Cancel</Button> 
            </>
          ) : (
            <>

              <h2>{movie.movie_title}</h2>
              <img src={movie.picture} alt={movie.movie_title} />
              <p>Category: {movie.category}</p>
              <p>Director: {movie.director}</p>
              <p>Producer: {movie.producer}</p>
              <p>Cast: {movie.cast}</p>
              <p>Synopsis: {movie.synopsis}</p>
              <p>Category: {movie.category}</p>
              <p>Rating: {movie.rating}</p>
              <iframe
                width="560"
                height="315"
                src={movie.trailer}
                title="Movie Trailer"
                frameBorder="0"
                allowFullScreen
              ></iframe> < br/>
              <Button onClick={enableEdit}>Edit Movie</Button>
            </>
          )}
        </form>
      ) : (
        <p>Loading movie details...</p>
      )}
    </div>
  );
};

export default EditMovie;