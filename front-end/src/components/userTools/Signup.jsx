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
//import { getAuth, sendSignInLinkToEmail } from "firebase/auth";

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
  const [promo, setPromo] = useState(false);
  const [loading, setLoading] = useState(false);

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

      // Define new user
      const newUser = {
        uid: userCred.user.uid,
        fname: firstName,
        lname: lastName,
        email: email,
        passwd: password,
        phone: number,
        promo: promo,

        cardNumber: cardNumber,
        billingAddress: billingAddress,
        cvv: cvv,
        expirationDate: expirationDate,
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
            <input
              type="checkbox"
              checked={promo}
              onChange={(e) => setPromo(e.target.value)}
            />
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
