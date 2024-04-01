import React, { useState, useContext } from "react";
import "./Signup.css";
import "../Button.css";
import Button from "../Button";
import { collection, addDoc, getDocs, doc, setDoc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  //  sendSignInLinkToEmail,
  sendEmailVerification,
} from "firebase/auth";
import { db } from "../../config/firestore";
import { encryptData } from "../../services/crypto";
//import { getAuth, sendSignInLinkToEmail } from "firebase/auth";

function Signup({ toggle, updateToken }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardType, setCardType] = useState("");
  const [cvv, setCvv] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  const [homeAddressOne, setHomeAddressOne] = useState("");
  const [homeAddressTwo, setHomeAddressTwo] = useState("");
  const [homeCity, setHomeCity] = useState("");
  const [homeState, setHomeState] = useState("");
  const [homeZipCode, setHomeZipCode] = useState("");

  const [billingAddressOne, setBillingAddressOne] = useState("");
  const [billingAddressTwo, setBillingAddressTwo] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  const passphrase = "webufhibejnlisuediuwe";

  const [error, setError] = useState("");
  const [promo, setPromo] = useState(false);
  const [loading, setLoading] = useState(false);

  const [signupDone, setSignupDone] = useState(false);

  //  const { setUserData } = useContext(UserContext);

  const validateEmail = (email) => {
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return validRegex.test(email);
  };

  const checkEmailAvailability = async (email) => {
    try {
      const snapshot = await getDocs(collection(db, "user"));
      const existingUser = snapshot.docs.find(
        (doc) => doc.data().email === email
      );
      if (existingUser) {
        setError("This email is already in use.");
        return false;
      }
      return true;
    } catch (error) {
      // catch other error
      console.error("Error checking email availability:", error);
      setError(
        "There was a problem checking email availability. Please try again."
      );
      return false;
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (password !== confirmPassword) {
        setError(
          "Passwords do not match. Please make sure both passwords are the same."
        );
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        setError(
          "Password is too short. Please use a password with at least 6 characters."
        );
        setLoading(false);
        return;
      }

      if (!validateEmail(email)) {
        setError("Invalid email address.");
        setLoading(false);
        return;
      }

      if (!(await checkEmailAvailability(email))) {
        setLoading(false);
        return;
      }

      // Register as authenticated user
      const auth = getAuth();
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Send email verification
      await sendEmailVerification(userCred.user);
      console.log("Email verification sent.");
      setSignupDone(true);
      setError("");

      // Define new user
      const newUser = {
        uid: userCred.user.uid,
        fname: firstName,
        lname: lastName,
        email: email,
        //        passwd: password,
        phone: number,
        promo: promo,

        homeAddressOne: homeAddressOne,
        homeAddressTwo: homeAddressTwo,
        homeCity: homeCity,
        homeState: homeState,
        homeZipCode: homeZipCode,

        cardNumber: encryptData(cardNumber, passphrase),
        cvv: encryptData(cvv, passphrase),
        expirationDate: encryptData(expirationDate, passphrase),
        billingAddressOne: encryptData(billingAddressOne, passphrase),
        billingAddressTwo: encryptData(billingAddressTwo, passphrase),
        city: encryptData(city, passphrase),
        state: encryptData(state, passphrase),
        zipCode: encryptData(zipCode, passphrase),

        role: "user", // role
        status: "inactive", // user status from verifying email address.
      };

      // Create user entry in Firestore with the user's UID as the document ID
      const userRef = doc(db, "user", userCred.user.uid);
      await setDoc(userRef, newUser);
      console.log("Document written with ID: ", userCred.user.uid);

      setLoading(false);
      toggle();
    } catch (error) {
      console.error("Signup error:", error);
      setError("Failed to sign up, please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>SIGNUP</h2>
        <hr className="signup-divider" />
        {error && <p className="error-message">{error}</p>}
        {signupDone ? (
          <p className="success-message">
            You have successfully signed up! Check your inbox to verify your
            email address.
          </p>
        ) : (
          <form onSubmit={handleSignup}>
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
              Address Line 2:
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
              City:
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
              State:
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
              Zip Code:
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
            <br />
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
                onChange={(e) => {
                  cardNum = encrypt(e.target.value);
                  setCardNumber(cardNum);
                }}
                className="input-field"
              />
            </label>
            <br />

            <label>
              Card Type:
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
              Address Line 2:
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
              City:
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
              State:
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
              Zip Code:
              <input
                type="text"
                name="zipCode"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="input-field"
              />
              <br />
            </label>
            <br />
            <button className="btn" type="submit">
              SIGNUP
            </button>
          </form>
        )}
        <button className="btn" onClick={toggle}>
          CLOSE
        </button>
      </div>
    </div>
  );
}
export default Signup;
