import React, { useState, useContext } from "react";
import "./Signup.css";
import "./Button.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";

function Signup({ toggle, updateToken }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUserData } = useContext(UserContext);

  const validateEmail = (email) => {
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return validRegex.test(email);
  };

  function httpGetSync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText);
    };
    xmlHttp.open("GET", theUrl, false); // true for asynchronous
    xmlHttp.setRequestHeader(
      "Access-Control-Allow-Origin",
      "http://csci4050.heliumyang.com:3000/mewmewmewvies/"
    );
    xmlHttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST, PUT");
    xmlHttp.send(null);
  } // httpGetAsync

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Check if first and second passwords match
      if (password !== confirmPassword) {
        setError(
          "Passwords do not match. Please make sure both passwords are the same."
        );
        setLoading(false);
        return;
      }

      // Check if password is too short (6)
      if (password.length < 6) {
        setError(
          "Password is too short. Please use a password with at least 6 characters."
        );
        setLoading(false);
        return;
      }

      // Validate email
      if (!validateEmail(email)) {
        setError("Invalid email address.");
        setLoading(false);
        return;
      }
      var userData;

      const newUser = {
        fname: firstName,
        lname: lastName,
        email: email,
        passwd: password,
        phone: number,
      };

      const queryString = Object.keys(newUser)
        .map((key) => key + "=" + newUser[key])
        .join("&");
      httpGetSync(
        `http://csci4050.heliumyang.com:2999/register/?${queryString}`,
        function (data) {
          userData = data;
        }
      );
      console.log(response.data); // Log response data

      setLoading(false);
      toggle();
    } catch (err) {
      setLoading(false);
      console.error("Signup error:", err);

      const errorMessage =
        err.response?.data?.msg || "An error occurred while signing up.";
      setError(errorMessage);
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Signup</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSignup}>
          <h3>Personal Details</h3>
          <label>
            First Name:
            <input
              required
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <br />
          <label>
            Last Name:
            <input
              required
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          <br />
          <label>
            Phone Number:
            <input
              required
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label>
            <br /> Confirm password:
            <input
              required
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <br />
          </label>
          <label>
            <input type="checkbox" />
            Opt in to receive promotional emails.
            <br />
          </label>
          <br />
          <h3>Financial Details</h3>
          <label>
            <br /> Card Number
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
            <br />
          </label>
          <label>
            <br /> CVV
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
            <br />
          </label>
          <label>
            <br /> Expiration Date
            <input
              type="text"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
            />
            <br />
          </label>
          <label>
            <br /> Billing Address
            <input
              type="text"
              value={billingAddress}
              onChange={(e) => setBillingAddress(e.target.value)}
            />
            <br />
          </label>
          <button className="checkout-button" type="submit">
            Signup
          </button>
        </form>
        <Button className="btn" onClick={toggle}>
          Close
        </Button>
      </div>
    </div>
  );
}

export default Signup;
