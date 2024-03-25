//import React from 'react';
import React, { useContext, useState } from "react";
import "./Login.css";
import "./Button.css";
import ForgotPassword from "./ForgotPassword";
import Button from "./Button";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/UserContext"
import Signup from "./Signup";
import Header from "./Header";

function Login({ toggle, updateToken }) {
    // used https://dev.to/afromatt6288/create-a-popup-form-for-login-and-then-style-it-37jl
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameadmin, setUsernameAdmin] = useState("");
    const [passwordadmin, setPasswordAdmin] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setUserData } = useContext(UserContext);
    const [forgotPasswordSeen, setForgotPasswordSeen] = useState(false);

    const toggleForgotPassword = () => {
        setForgotPasswordSeen(!forgotPasswordSeen);
    };
    async function handleLogin(e) {
        e.preventDefault();
        setLoading(true);
    
        try {
            const loginRes = await axios.post("http://localhost:8081/api/users/login", {
                username,
                password,
            });
    
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            });
    
            localStorage.setItem("auth-token", loginRes.data.token);
            updateToken();
            setLoading(false);
    
            toggle();
        } catch (err) {
            setLoading(false);
    
            console.error("Login error:", err.response); // error message in console 
    
            // for 404 error: usually wrong username or password 
            if (err.response && err.response.status === 400) {
                setError("Invalid credentials. Please check your username and password.");
            } 
        }
    }
    
    console.log("Error state:", error);

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
//                            value={username}
//                            onChange={(e) => setUsername(e.target.value)}
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
                {forgotPasswordSeen ? (
                    <ForgotPassword updateToken={updateToken} toggle={toggleForgotPassword} />
                ) : null}
            </div>
        </div>
    );
}


export default Login;
