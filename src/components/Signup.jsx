//import React from 'react';
import React, { useState, useContext } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/UserContext";

function Signup({ toggle, updateToken }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
    const navigate = useNavigate();
    const { setUserData } = useContext(UserContext);

    async function handleSignup(e) {
        e.preventDefault();
        setLoading(true);

        try {
            // Check if first and second passwords match
            if (password !== confirmPassword) {
                setError("Passwords do not match. Please make sure both passwords are the same.");
                setLoading(false);
                return;
            }

            // Check if password is too short (6)
            if (password.length < 6) {
                setError(
                    "Password is too short. Please use a password with at least 6 characters."
                );
                setLoading(false);
                return;
            }

            const newUser = {
                username: username,
                password: password,
                confirmPassword: confirmPassword,
            };

            await axios.post("http://localhost:8081/api/users/signup", newUser);

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
            err && setError(err.response.data.msg); // Assuming the error response contains a 'msg' property
            console.log(err);
        }
    }

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Signup</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSignup}>
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
                    <label>
                        Confirm password:
                        <input
                            required
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </label>
                    <button className="btn" type="submit">
                        Signup
                    </button>
                </form>
                <button className="btn" onClick={toggle}>
                    Close
                </button>
            </div>
        </div>
    );
}

export default Signup;
