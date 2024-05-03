import React, { useState, useEffect, useContext } from "react";
import "./Login.css";
import "./Button.css";
import ForgotPassword from "./ForgotPassword";
import Button from "./Button";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { login } from "../functionality/User";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotPasswordSeen, setForgotPasswordSeen] = useState(false);
  const [loginDone, setLoginDone] = useState(false);
  const userContext = useContext(UserContext);

  const toggleForgotPassword = () => {
    setForgotPasswordSeen(!forgotPasswordSeen);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    //login(), returns either uid or returns error code
    var user = await login(email, password, userContext);
    if (user.error == 0) {
      console.log("got here");
      setError("");
      localStorage.setItem("userRole", user.role); 
      console.log(localStorage);
      setLoginDone(true);
    } else if (user.error == 1 && !user.verified) {
      setError("Please verify your email address. Check your inbox for the verification email.");
    } else {
      setError("Failed to login, please try again later.");
    } // if
    setLoading(false);

  };

  const handleClose = () => {
    setError("");
    setLoading(false);
    navigate('/');
    
    window.location.reload();
  };

  return (
    <div className="overlay">
    <div className="popup">
      <div className="popup-inner">
        <h2>LOGIN</h2>
        <hr className ="login-divider"></hr>
        {error && <p className="error-message">{error}</p>}
        {loginDone ? (
          <p className="success-message">
            You have successfully logged in!
          </p>
        ) : (
        <form onSubmit={handleLogin}>
          <label className="field">
            Email:{" "}
            <input
              required
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br/>
          <label className="field">
            Password:{" "}
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br/>
          <Button className="btn" type="submit">
            LOGIN
          </Button>
        </form>
        )}
        <Button className="btn" onClick={handleClose}>
          CLOSE
        </Button>
        <br />
        <Button className = "btn" onClick={toggleForgotPassword}>
          FORGOT PASSWORD
        </Button>
        {forgotPasswordSeen && (
          <ForgotPassword
            toggle={toggleForgotPassword}
          />
        )}
        </div>
      </div>
      </div>
  );
}

export default Login;
