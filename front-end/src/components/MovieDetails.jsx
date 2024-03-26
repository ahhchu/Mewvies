import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./MovieDetails.css";
import MovieCard from "./MovieCard";

const MovieDetails= (props) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
        .get("http://localhost:8081/api/paintings")
        .then((result) => setMovies(result.data));
  }, []);

    return (
      <div>

       <MovieCard
          key={index}
          imageUrl={movie.imageUrl} 
          altText={movie.name}
          title={movie.name}
          trailerUrl={movie.trailerUrl}
          link={movie.link}
          isSelected={index === currentIndex} 
         />
      </div>
    );
  };
  
  export default MovieDetails;
  