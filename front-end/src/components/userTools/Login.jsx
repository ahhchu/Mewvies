import React, { useState } from "react";
import "./Login.css";
import "../Button.css";
import ForgotPassword from "./ForgotPassword";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firestore";

function Login({ toggle, updateToken, handleLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotPasswordSeen, setForgotPasswordSeen] = useState(false);
  const navigate = useNavigate();

  const toggleForgotPassword = () => {
    setForgotPasswordSeen(!forgotPasswordSeen);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("LOGIN SUCCESS");

      if (auth.currentUser.emailVerified) {
        // User's email is verified, update their status in Firestore
        const userRef = doc(db, "user", auth.currentUser.uid);
        await updateDoc(userRef, {
          status: "Active",
        });
        console.log("User status updated to Active");
      } else {
        setError("Please verify your email address. Check your inbox for the verification email.");
        await sendEmailVerification(auth.currentUser); // resend email option
        console.log("Verification email sent");
      }

      // Retrieve user role
      const userRef = doc(db, "user", auth.currentUser.uid);
      const userDoc = await getDoc(userRef);
      const userRole = userDoc.data().role;
      localStorage.setItem("userRole", userRole); 
      handleLoginSuccess(userRole); 

      // Update last login time
      await updateDoc(userRef, {
        lastLogin: new Date(), 
      });
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <label className="field">
            Email:
            <input
              required
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="field">
            Password:
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <Button className="btn" type="submit">
            Login
          </Button>
        </form>
        <Button className="btn" onClick={toggle}>
          Close
        </Button>
        <br />
        <Button onClick={toggleForgotPassword}>Forgot your password?</Button>
        {forgotPasswordSeen && (
          <ForgotPassword
            updateToken={updateToken}
            toggle={toggleForgotPassword}
          />
        )}
      </div>
    </div>
  );
}

export default Login;
