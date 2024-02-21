import React, { useState, useContext } from "react";
import "./Movie.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/UserContext";


function Movie() {

     const[trailerUrl, setTrailerUrl] = userState("");
     
     const playTrailer = (trailerUrl) => {
        setTrailerUrl(trailerUrl);
     }

    return (
        <div className = "Movie">
            <div className = "Currently Running">
                <h1>Currently Running</h1>
              {/*Movie 1*/}
              <div className="MovieCard">
                <h3>Cats</h3>
                  {/* Hardcoded */}
                  <button onClick={() => playTrailer("https://www.youtube.com/watch?v=gNTDoOmc1OQ")}>
                    Play Trailer
                  </button>
              </div>
            </div>

            <div className = "Coming Soon">
                <h1>Coming Soon</h1>
                  {/*Movie 1*/}
              <div className="MovieCard">
                <h3>Kung Fu Panda 4</h3>
                  {/* Hardcoded */}
                  <button onClick={() => playTrailer("https://www.youtube.com/watch?v=_inKs4eeHiI")}>
                    Play Trailer
                  </button>
              </div>
            </div>
            </div>
    )
}

export default Movie;