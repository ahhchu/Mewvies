//import React from 'react';
import React, { useState, useContext } from "react";
import "./Signup.css";
import "./Button.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";

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
                confirmPassword: confirmPassword
            };

            await axios.post("http://localhost:8081/api/users/signup", newUser);

            const loginRes = await axios.post("http://localhost:8081/api/users/login", {
                username,
                password
            });
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user
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
                    <h3>Personal Details</h3>
                <label>
                        First Name:
                        <input
                            required
                            type="text"
                           // value={username}
//                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <br /> 
                    <label>
                        Last Name:
                        <input
                            required
                            type="text"
                            //value={username}
//                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <br /> 
                    <label>
                        Phone Number:
                        <input
                            required
                            type="text"
//                            value={number}
                        />
                    </label>
                    <br /> 
                    <label>
                        Email:
                        <input
                            required
                            type="text"
//                            value={username}
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
                        />
                        Opt in to recieve promotional emails. 
                        <br />
                    </label>
                    <br />
                    <h3>Financial Details</h3>
                    <label>
                       <br /> Card Number
                        <input
                            type="cardNumber"
//                            value={confirmPassword}
                        />
                        <br />
                    </label>
                    <label>
                       <br /> CVV
                        <input
                            type="CVV"
//                            value={confirmPassword}
                        />
                        <br />
                    </label>
                    <label>

                       <br /> Expiration Date
                        <input
                            type="expirationDate"
//                            value={confirmPassword}
                        />
                        <br />
                    </label>
                    <label>
                       <br /> Billing Address
                        <input
                            type="cardNumber"
//                            value={confirmPassword}
                        />
                        <br />
                    </label>
                    <Link to="/registration">
              <button className = "checkout-button">Signup</button>
             </Link>
                </form>
                <Button className="btn" onClick={toggle}>
                    Close
                </Button>
    
            </div>
        </div>
    );
}

export default Signup;
