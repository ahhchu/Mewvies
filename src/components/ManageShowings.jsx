import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import "./AddShowing.css";
import "./Button.css";
import Button from "./Button";
import { checkEmailAvailability, validateEmail, registerUser, addPayment } from "../functionality/User";
import { getMovies } from "../functionality/movie";
import { addShowing, getShowings, getShowingsByMovie, removeShowing } from "../functionality/showing";
import { useNavigate } from "react-router-dom";

function ManageShowings() {

  const { movieID } = useParams();
  const [movie, setMovie] = useState({movie_title: ""});

  const [showings, setShowings] = useState([]);
  const [reset, setReset] = useState(false);

    getMovies().then((data) => {
      data.forEach(element => {
        if (element.movie_id == movieID) {
          setMovie(element);
        }
      });
    })
    getShowings().then((data) => {
      var tempArray = [];
      data.forEach(element => {
        if (element.movie_id == movieID) {
          tempArray.push(element);
        }
      });
      console.log(tempArray);
      console.log(movieID);
      setShowings(tempArray)
      setReset(true)
    })

  return (
    <div className="popup">
    
      <div className="popup-inner">
        <h2>Showing all showings for:</h2>
        <div className="signup-divider" />

          <div className="personal-details">
            <h3>{movie.movie_title}</h3>
            <Link to ={"/addshowing/" + movieID}><Button>Add Showing</Button></Link>
            <table>
              <tr>
                <th>Showroom</th>
                <th>Time</th>
                <th>Delete Showing</th>
              </tr>
              
              {showings.map((show) => {
                return( <tr>
                <th>{show.room_id}</th>
                <th>{new Date(show.showing_time.seconds).toString()}</th>
                <th><Button onClick={() => removeShowing(show.showing_id)}>Delete</Button></th>
                </tr>
                )
              })}
              </table>
            </div>
          </div>
      </div>
  );
}

export default ManageShowings;
