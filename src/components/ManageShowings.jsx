import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import "./AddShowing.css";
import "./Button.css";
import Button from "./Button";
import { checkEmailAvailability, validateEmail, registerUser, addPayment } from "../functionality/User";
import { getMovies } from "../functionality/movie";
import { addShowing } from "../functionality/showing";
import { useNavigate } from "react-router-dom";

function AddShowing() {

  const { movieID } = useParams();
  const [movie, setMovie] = useState({movie_title: ""});
  const [showings, setShowings] = useState([])


  /**USER */
  const [time, setTime] = useState("");
  const [showroom, setShowroom] = useState("");

  const [error, setError] = useState("");
  const [signupDone, setSignupDone] = useState(false);

  /*
  useEffect(() => {

  }, [movieID]);*/
  getMovies().then((data) => {
    data.forEach(element => {
      if (element.movie_id == movieID) {
        setMovie(element);
      }
    });
  })

  // this function validates input from the "sign up" page, then calls registerUser from User.js
  async function addTheShowing(e) {
    e.preventDefault();
    try {
      
      // errorMsg variable to deal with async functions that returns an error
      var errorMsg;

        //creates the actual user
        var added = await addShowing(movie.movie_id, showroom, new Date(time));
        if (added) {
          setError("Showing has been added.");
        } else {
          setError("Showing cannot be added.");
        }

    } catch (error) {
      console.error("error:", error);
      //setError("Failed to sign up, please try again later.");
    }
  };

  return (
    <div className="popup">
    
      <div className="popup-inner">
        <h2>Showing all showings for:</h2>
        <div className="signup-divider" />

        {error && <p className="error-message">{error}</p>}

          <div className="personal-details">
            <h3>{movie.movie_title}</h3>
            <table>
              <tr>
                <th>Showroom</th>
                <th>Time</th>
                <th>Delete Showing</th>
              </tr>
            {showings.map((show, index) => (
              <tr>
            <th><Button>Delete Showing</Button></th>
            </tr>
        ))}
        </table>
            </div>
          </div>
      </div>
  );
}

export default AddShowing;
