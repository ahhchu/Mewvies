import React, { useState, useContext } from "react";
import "./AddMovie.css";
import "./Button.css";
import {Link} from "react-router-dom"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "./Button";
import { checkEmailAvailability, validateEmail, registerUser, addPayment } from "../functionality/User";
import { addMovie, updateMovie, getMovies, removeMovie } from "../functionality/movie";

function AddMovie({ toggle, updateToken }) {
/** MOVIE */
  const [newMovie, setNewMovie] = useState("");
  const [movieTitle, setMovieTitle] = useState("");
  const [category, setCategory] = useState("");
  const [cast, setCast] = useState("");
  const [director, setDirector] = useState("");
  const [producer, setProducer] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");
  const [rating, setRating] = useState("");
  const [picture, setPicture] = useState("");
  const [openingDate, setOpeningDate] = useState("");


  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false)
 

  // this function validates input from the "sign up" page, then calls registerUser from User.js
  async function handleAddMovie (e) {
    e.preventDefault();
    setLoading(true);
    try {
      
      
      // errorMsg variable to deal with async functions that returns an error
      var errorMsg;
      var uid;
      // Email availability errors - maybe change to duplicate movies
      // await checkEmailAvailability(email).then((response) => {errorMsg = response})
      // if (!errorMsg == 0) {
      //   if (errorMsg == 1) {
      //     setError("This email is already in use.");
      //   } else {
      //     setError("There was a problem checking email availability. Please try again.");
      //   }
      //   setLoading(false);
      //   return;
      // } else {
        //creates the actual user
        uid = await addMovie(movieTitle, category, cast, director, producer, synopsis, trailerUrl, rating, picture, openingDate);
        setNewMovie(true);
        setPopup(false);
        setError("");
      // } // if
    } catch (error) {
      console.error("Signup error:", error);
      //setError("Failed to sign up, please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className={popup ? "popup" : "hidden"}>
    
    <form onSubmit={handleAddMovie}>
      <div className="popup-inner">
        <h2>Add a Movie</h2>
        <div className="signup-divider" />
        {error && <p className="error-message">{error}</p>}


        {newMovie ? (
          <>
          <p className="success-message">
            You have successfully added a new movie!
          </p>
          </>
        ) : (
          <div className="personal-details">
            <h3>Movie Details</h3>
            <label>
              <span style={{ color: "red" }}>*</span>
              Movie Title:{" "}
              <input
                required
                type="text"
                name="movieTitle"
                value={movieTitle}
                onChange={(e) => setMovieTitle(e.target.value)}
                className="input-field"
              />
            </label>
            <br />
            <label>
              <span style={{ color: "red" }}>*</span>
              Category:{" "}
              <input
                required
                type="text"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input-field"
              />
            </label>
            <br />
            <label>
              <span style={{ color: "red" }}>*</span>
              Cast:{" "}
              <input
                required
                type="text"
                name="cast"
                value={cast}
                onChange={(e) => setCast(e.target.value)}
                className="input-field"
              />
            </label>
            <br />
            <label>
              <span style={{ color: "red" }}>*</span>
              Director:{" "}
              <input
                required
                type="text"
                name="director"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
                className="input-field"
              />
            </label>
            <br />
            <label>
              <span style={{ color: "red" }}>*</span>
              Producer:{" "}
              <input
                required
                type="text"
                name="producer"
                value={producer}
                onChange={(e) => setProducer(e.target.value)}
                className="input-field"
              />
            </label>
            <br />
            <label>
              <span style={{ color: "red" }}>*</span>
              Synopsis:{" "}
              <input
                required
                type="text"
                name="synopsis"
                value={synopsis}
                onChange={(e) => setSynopsis(e.target.value)}
                className="input-field"
              />
            </label>
            <br />
            <label>
              <span style={{ color: "red" }}>*</span>
              Trailer Url (in embed form):{" "}
              <input
                required
                type="text"
                name="trailerUrl"
                value={trailerUrl}
                onChange={(e) => setTrailerUrl(e.target.value)}
                className="input-field"
              />
            </label>
            <br />
            <label>
              <span style={{ color: "red" }}>*</span>
              Rating: {" "}
              <input
                required
                type="text"
                name="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="input-field"
              />
            </label>
            <br />
            <label>
            <span style={{ color: "red" }}>*</span>
             Picture Url: {" "}
              <input
                required
                type="text"
                name="picture"
                value={picture}
                onChange={(e) => setPicture(e.target.value)}
                className="input-field"
              />
            </label>
            <br />
            <label>
            <span style={{ color: "red" }}>*</span>
             Opening Date: {" "}
             <DatePicker
                required
                selected={openingDate}
                onChange={(date) => setOpeningDate(date)}
                dateFormat="yyyy-MM-dd" // Set date format
                className="input-field"
              />
            </label>
            <br />
            <div>
            <Button className="btn" type="submit" >
              ADD
            </Button>
            </div>
            </div>
            )} 

        
            <br />
            
          </div>
          </form>
          <Link to = "/ManageMovies">
          <Button className="btn">
              CLOSE
            </Button>
            </Link>
      </div>
  );
}
export default AddMovie;

