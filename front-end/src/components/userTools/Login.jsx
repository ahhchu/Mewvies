import React, { useContext, useState } from "react";
import "./Login.css";
import "../Button.css";
import ForgotPassword from "./ForgotPassword";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
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
    //check for authenticated user
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("LOGIN SUCCESS");
      handleLoginSuccess();
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, {
        lastLogin: new Date(), // Update with the current date and time
      });

      // Redirect or perform other actions after login
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
