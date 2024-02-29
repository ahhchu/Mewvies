//import React from 'react';
import React, { useContext, useState } from "react";
import "./Login.css";
import "./Button.css";
import Button from "./Button";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/UserContext"

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
                    <label>
                        Username:
                        <input
                            required
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <label>
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
                <form onSubmit={handleLogin}>
                    <label>
                        Username:
                        <input
                            required
                            type="text"
                            value={usernameadmin}
                            onChange={(e) => setUsernameAdmin(e.target.value)}
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            required
                            type="password"
                            value={passwordadmin}
                            onChange={(e) => setPasswordAdmin(e.target.value)}
                        />
                    </label>
                    <Link to={"/admin"}>
                <Button className="btn" type = "submit">
                    Admin Login
                </Button>
                </Link>
                </form>
                <Button className="btn" onClick={toggle}>
                    Close
                </Button>
            </div>
        </div>
    );
}


export default Login;
