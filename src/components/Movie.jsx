import React, { useState, useContext } from "react";
import "./Movie.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Movie() {
    const [catsTrailerUrl, setCatsTrailerUrl] = useState("");
    const [kungFuPandaTrailerUrl, setKungFuPandaTrailerUrl] = useState("");
  
    const playCatsTrailer = () => {
      setCatsTrailerUrl("https://www.youtube.com/embed/gNTDoOmc1OQ");
      setKungFuPandaTrailerUrl(""); // reset trailer url
    };
  
    const playKungFuPandaTrailer = () => {
      setKungFuPandaTrailerUrl("https://www.youtube.com/embed/_inKs4eeHiI");
      setCatsTrailerUrl(""); // reset trailer url 
    };

    return (
      <div className="Movie">
        <div className="Currently Running">
          <h1>Currently Running</h1>
          {/* Movie 1 */}
          <div className="MovieCard">
            <h3>Cats</h3>
            <Link to="/movie-details">
              <img
                src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fencrypted-tbn0.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcTlhjCq92hLSM8SQ8LQY-T36pohncVV7Fhsjx3X69pEarYVe_hO&psig=AOvVaw33QSEZ0Qk-usIcW6z1GWfB&ust=1708628352705000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNDYw-GOvYQDFQAAAAAdAAAAABAE"
                alt="Cats"
                width="300"
                />
            </Link>
            {/* Display the trailer */}
            {catsTrailerUrl && (
              <div className="TrailerContainer">
                <iframe
                  width="560"
                  height="315"
                  src={catsTrailerUrl}
                  title="YouTube Trailer"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            )}
            </div>
            <button onClick={playCatsTrailer}>Play Trailer</button>
        </div> {/* currently running*/}
  
        <div className="Coming Soon">
          <h1>Coming Soon</h1>
          {/* Movie 2 */}
          <div className="MovieCard">
            <h3>Kung Fu Panda 4</h3>
            <Link to="/movie-details">  
             <img 
             src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcShXRgSAV3GrlVrpvGcLLaEmue2hAvF1BH3YP3BRyX6m1L1MIxjjWH0EkfHn7XTMqidJG_c_g" 
             alt="KungFuPanda4"
             width="300"
             />
             </Link>

            {/* Display the trailer */}
            {kungFuPandaTrailerUrl && (
              <div className="TrailerContainer">
                <iframe
                  width="560"
                  height="315"
                  src={kungFuPandaTrailerUrl}
                  title="YouTube Trailer"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
          <button onClick={playKungFuPandaTrailer}>Play Trailer</button>
        </div>
      </div>
    );
  }
  
  export default Movie;
