import React, { useContext, useState } from "react";
import "./Login.css";
import "./Button.css";
import ForgotPassword from "./ForgotPassword";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/UserContext";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login({ toggle, updateToken }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUserData } = useContext(UserContext);
  const [forgotPasswordSeen, setForgotPasswordSeen] = useState(false);
  const navigate = useNavigate();

  const toggleForgotPassword = () => {
    setForgotPasswordSeen(!forgotPasswordSeen);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    //check for authenticated user
    try {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      }) 
      console.log("LOGIN SUCCESS");
    } catch(error) {
        console.log(error);
      };
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
