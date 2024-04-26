import React, { useState, useContext } from "react";
import "./AddMovie.css";
import "./Button.css";
import Button from "./Button";
import { checkEmailAvailability, validateEmail, registerUser, addPayment } from "../functionality/User";
function AddMovie({ toggle, updateToken }) {
/** MOVIE */
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



  /**USER */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [homeAddressOne, setHomeAddressOne] = useState("");
  const [homeAddressTwo, setHomeAddressTwo] = useState("");
  const [homeCity, setHomeCity] = useState("");
  const [homeState, setHomeState] = useState("");
  const [homeZipCode, setHomeZipCode] = useState("");
 /**CARD */
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardType, setCardType] = useState("");
  const [cvv, setCvv] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [billingAddressOne, setBillingAddressOne] = useState("");
  const [billingAddressTwo, setBillingAddressTwo] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [error, setError] = useState("");
  const [promo, setPromo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [signupDone, setSignupDone] = useState(false);
  const [addNewCard, setNewCard] = useState(false);
  // this function validates input from the "sign up" page, then calls registerUser from User.js
  async function handleSignup (e) {
    e.preventDefault();
    setLoading(true);
    try {
      // password matching
      if (password !== confirmPassword) {
        setError(
          "Passwords do not match. Please make sure both passwords are the same."
        );
        setLoading(false);
        return;
      }
      // checks password length
      if (password.length < 6) {
        setError(
          "Password is too short. Please use a password with at least 6 characters."
        );
        setLoading(false);
        return;
      }
      // Email validation error
      if (!validateEmail(email)) {
        setError("Invalid email address.");
        setLoading(false);
        return;
      }
      
      // errorMsg variable to deal with async functions that returns an error
      var errorMsg;
      var uid;
      // Email availability errors
      await checkEmailAvailability(email).then((response) => {errorMsg = response})
      if (!errorMsg == 0) {
        if (errorMsg == 1) {
          setError("This email is already in use.");
        } else {
          setError("There was a problem checking email availability. Please try again.");
        }
        setLoading(false);
        return;
      } else {
        //creates the actual user
        uid = await registerUser(firstName, lastName, email, password, number, promo, homeAddressOne, homeAddressTwo, homeCity, homeState, homeZipCode);
        setSignupDone(true);
        setError("");
      } // if
      // adds new card to the db
      addPayment(cardName, cardNumber, cardType, expirationDate, billingAddressOne, billingAddressTwo, city, state, zipCode, uid);
      setLoading(false);
      toggle();
    } catch (error) {
      console.error("Signup error:", error);
      //setError("Failed to sign up, please try again later.");
      setLoading(false);
    }
  };
  const toggleNewCard = () => {
    setNewCard(!addNewCard);
  };
  return (
    <div className="popup">
    
    <form onSubmit={handleSignup}>
      <div className="popup-inner">
        <h2>Add a Movie</h2>
        <div className="signup-divider" />
        {error && <p className="error-message">{error}</p>}

        {signupDone ? (
          <p className="success-message">
            You have successfully signed up! Check your inbox to verify your
            email address.
          </p>
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
                value={password}
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
             Opening Date: {" "}
              <input
                required
                type="text"
                name="openingDate"
                value={openingDate}
                onChange={(e) => setOpeningDate(e.target.value)}
                className="input-field"
              />
            </label>
            <br />
            </div>
            )} 

        
            <br />
            <div>
            <Button className="btn" type="submit">
              ADD
            </Button>
        
            <Button className="btn" onClick={toggle}>
              CLOSE
            </Button>
            </div>
          </div>
          </form>
      </div>
  );
}
export default AddMovie;

