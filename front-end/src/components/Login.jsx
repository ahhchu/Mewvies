import React, { useContext, useState } from "react";
import "./Login.css";
import "./Button.css";
import ForgotPassword from "./ForgotPassword";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/UserContext";

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

    try {
      const userData = await loginUser(email, password);
      setUserData(userData[0]); // Access user object from array
      localStorage.setItem("auth-token", userData[0].token); // Assuming token is in user object
      updateToken();
      setLoading(false);
      toggle();
    } catch (err) {
      setLoading(false);
      console.error("Login error:", err.response);
      if (err.response && err.response.status === 400) {
        // Handle 400 status for invalid credentials
        setError("Invalid email or password.");
      } else {
        // Handle other errors (e.g., network issues)
        setError("An error occurred. Please try again later.");
      }
    }
  };

  const loginUser = async (email, password) => {
    const loginRes = await axios.get(
      "http://csci4050.heliumyang.com:2999/verifylogin",
      { params: { email, passwd: password } }
    );
    console.log(loginRes.data);
    return loginRes.data;
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
