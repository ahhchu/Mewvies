import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./MovieDetails.css";

function MovieDetails() {
    return (
      <div>
        <image of the movie selected></image>
        <div className="showtimes">
          <Link to="/seats">
            <button>12:00pm</button>
          </Link>
          <Link to="/seats">
            <button>2:00pm</button>
          </Link>
          <Link to="/seats">
            <button>5:30pm</button>
          </Link>
        </div>
      </div>
    );
  }
  
  export default MovieDetails;
  