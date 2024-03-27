import React, {useState} from 'react';
import { Link } from "react-router-dom";
import "./CatMovieDetails.css";

function Saltburn() {
    const [saltburnTrailerUrl, setSaltburnTrailerUrl] = useState("");
  
    const playSaltburnTrailer = () => {
      setSaltburnTrailerUrl("https://www.youtube.com/embed/lALMdJf6UUE");
    };

    return (
        <div>
           <img
                src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSjRpxUmP5Ksf0ouDnq1IMpMljlG9Mb4lInufOSiazqX67TsTqmY_6hnpRUmT85omFtwq_XBQ"
                alt="Saltburn"
                width="300"
                />
            <h1>Saltburn</h1>
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
                  src={saltburnTrailerUrl}
                  title="YouTube Trailer"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            <button className="trailer-button" onClick={playSaltburnTrailer}>Play Trailer</button>

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

export default Saltburn;