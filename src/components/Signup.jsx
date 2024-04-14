import React, { useState, useContext } from "react";
import "./Signup.css";
import "./Button.css";
import Button from "./Button";
import { checkEmailAvailability, validateEmail, registerUser, addPayment } from "../functionality/User";

function Signup({ toggle, updateToken }) {
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
      addPayment(cardName, cardNumber, expirationDate, billingAddressOne, billingAddressTwo, city, state, zipCode, uid);

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
        <h2>SIGNUP</h2>
        <div className="signup-divider" />

        {error && <p className="error-message">{error}</p>}


        {signupDone ? (
          <p className="success-message">
            You have successfully signed up! Check your inbox to verify your
            email address.
          </p>
        ) : (
          <div className="personal-details">
            <h3>Personal Details</h3>
            <label>
              <span style={{ color: "red" }}>*</span>
              First Name:{" "}
              <input
                required
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input-field"
              />
            </label>
            <br />
            <label>
              <span style={{ color: "red" }}>*</span>
              Last Name:{" "}
              <input
                required
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input-field"
              />
            </label>
            <br />
            <label>
              <span style={{ color: "red" }}>*</span>
              Phone Number:{" "}
              <input
                required
                type="text"
                name="phoneNumber"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="input-field"
              />
            </label>
            <br />
            <label>
              <span style={{ color: "red" }}>*</span>
              Email:{" "}
              <input
                required
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              />
            </label>
            <br />
            <label>
              <span style={{ color: "red" }}>*</span>
              Password:{" "}
              <input
                required
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
              />
            </label>
            <br />
            <label>
              <span style={{ color: "red" }}>*</span>
              Confirm Password:{" "}
              <input
                required
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field"
              />
            </label>
            <br />
            <label>
              Home Address:{" "}
              <input
                type="text"
                name="homeAddressOne"
                value={homeAddressOne}
                onChange={(e) => setHomeAddressOne(e.target.value)}
                className="input-field"
              />
            </label>
            <br />
            <label>
              Address Line 2: {" "}
              <input
                type="text"
                name="homeAddressTwo"
                value={homeAddressTwo}
                onChange={(e) => setHomeAddressTwo(e.target.value)}
                className="input-field"
              />
            </label>
            <br />
            <label>
              City: {" "}
              <input
                type="text"
                name="homeCity"
                value={homeCity}
                onChange={(e) => setHomeCity(e.target.value)}
                className="input-field"
              />
            </label>
            <br />
            <label>
              State: {" "}
              <input
                type="text"
                name="homeState"
                value={homeState}
                onChange={(e) => setHomeState(e.target.value)}
                className="input-field"
              />
            </label>
            <br />
            <label>
              Zip Code: {" "}
              <input
                type="text"
                name="homeZipCode"
                value={homeZipCode}
                onChange={(e) => setHomeZipCode(e.target.value)}
                className="input-field"
              />
              <br />
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                name="promo"
                checked={promo}
                onChange={(e) => setPromo(e.target.checked)}
                className="checkbox-field"
              />
              Opt in to receive promotional emails.
            </label>
            </div>
            )}


            {addNewCard ? (
              <>
              <div className="card-details">
                <h3>Financial Details</h3>
                <label>
                  Name on Card:
                  <input
                    type="text"
                    name="cardName"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="input-field"
                  />
                </label>
                <br />
                <label>
                  Card Number:{" "}
                  <input
                    type="text"
                    name="cardNumber"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="input-field"
                  />
                </label>
                <br />
                <label>
                  Card Type: {" "}
                  <input
                    type="text"
                    name="cardType"
                    value={cardType}
                    onChange={(e) => setCardType(e.target.value)}
                    className="input-field"
                  />
                </label>
                <br />
                <label>
                  CVV:{" "}
                  <input
                    type="text"
                    name="cvv"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="input-field"
                  />
                </label>
                <br />
                <label>
                  Expiration Date:{" "}
                  <input
                    type="text"
                    name="expirationDate"
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                    className="input-field"
                  />
                </label>
                <br />
                <br />
                <label>
                  Billing Address:{" "}
                  <input
                    type="text"
                    name="billingAddressOne"
                    value={billingAddressOne}
                    onChange={(e) => setBillingAddressOne(e.target.value)}
                    className="input-field"
                  />
                </label>
                <br />
                <label>
                  Address Line 2: {" "}
                  <input
                    type="text"
                    name="billingAddressTwo"
                    value={billingAddressTwo}
                    onChange={(e) => setBillingAddressTwo(e.target.value)}
                    className="input-field"
                  />
                </label>
                <br />
                <label>
                  City: {" "}
                  <input
                    type="text"
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="input-field"
                  />
                </label>
                <br />
                <label>
                  State: {" "}
                  <input
                    type="text"
                    name="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="input-field"
                  />
                </label>
                <br />
                <label>
                  Zip Code: {" "}
                  <input
                    type="text"
                    name="zipCode"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="input-field"
                  />
                  <br />
                </label>
                </div>
                <Button className="btn" onClick={toggleNewCard}>
                  CANCEL
                </Button>

              </>
            ) : (
              <Button className="btn" onClick={toggleNewCard}>
                ADD CARD
              </Button>
            )}

            <br />
            <div>
            <Button className="btn" type="submit">
              SIGNUP
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

export default Signup;
