import React, {useState} from 'react';
import { Link } from "react-router-dom";
import "./CatMovieDetails.css";

function Dilwale() {
    const [dilwaleTrailerUrl, setDilwaleTrailerUrl] = useState("");
  
    const playDilwaleTrailer = () => {
      setDilwaleTrailerUrl("https://www.youtube.com/embed/AHuOo1DLcRc");
    };

    return (
        <div>
           <img
                src="https://m.media-amazon.com/images/M/MV5BOTUxODBjMDgtNTA3Zi00OTg0LTk5YTktYzY2ZGJlZDkwMzFlXkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_.jpg"
                alt="Dilwale"
                width="300"
                />
            <h1>Dilwale</h1>
            <h3>Category: musical fantasy film</h3>
            <h3>Cast:James Corden, Judi Dench, Jason Derulo</h3>
            <h3>Director: Tom Hooper</h3>
            <h3>Producer: Debra Hayward, Tim Bevan</h3>
            <h3>Synopsis: Victoria, a young white cat, is abandoned by her owner in the streets of London in the middle of the night. The alley cats, witnessing this introduce themselves to her as the "Jellicles." Mr. Mistoffelees, Munkustrap, Cassandra, and Demeter, take Victoria under their wing and show her the world of the Jellicles as they prepare for the Jellicle Ball, an annual ceremony where cats must compete to be chosen to go to the Heaviside Layer and be granted a new life.</h3>
            <h3>Reviews: "The film is flat, without any of the camp, kitsch high energy that characterised the stage show, but its wrongness is never less than mesmerising." - Deborah Ross</h3>
            <h3>Trailer PIcture and Video: 
              <div className="TrailerContainer">
                <iframe
                  width="560"
                  height="315"
                  src={dilwaleTrailerUrl}
                  title="YouTube Trailer"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            <button className="trailer-button" onClick={playDilwaleTrailer}>Play Trailer</button>

            </h3>
            <h3>MPAA-US film rating code: PG-13 </h3>
          <div className="showtimes">
            <Link to="/seats">
              <button className="trailer-button">Book Movie</button>
            </Link>
          </div>
        </div>
      );
    }

export default Dilwale;
