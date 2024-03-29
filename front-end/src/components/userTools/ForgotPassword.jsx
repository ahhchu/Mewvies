//import React from 'react';
import React, { useContext, useState } from "react";
import "./ForgotPassword.css";
import "../Button.css";
import Button from "../Button";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

function ForgotPassword({ toggle }) {
  // used https://dev.to/afromatt6288/create-a-popup-form-for-login-and-then-style-it-37jl
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function changePassword(e) {
    e.preventDefault();
    setLoading(true);
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setError("Please check your email for the password reset link.");
        setLoading(false);
        toggle(); // Close the popup or redirect as needed
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage); // Display the error message to the user
        setLoading(false);
        console.error(errorCode, errorMessage);
      });
  }

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Forgot Password</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={changePassword}>
          <label className="field">
            Email:
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <Button className="btn" type="submit" disabled={loading}>
            Send Reset Link
          </Button>
        </form>
        <Button className="btn" onClick={toggle}>
          Close
        </Button>
      </div>
    </div>
  );
}

export default ForgotPassword;
