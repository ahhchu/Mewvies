import React, { useState, useContext, useEffect } from "react";
import "./Signup.css";
import "./Button.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";

function Signup({ toggle, updateToken }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [number, setNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cvv, setCvv] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [billingAddress, setBillingAddress] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { setUserData } = useContext(UserContext);

    const validateForm = () => {
        return email !== "" && password !== "" && confirmPassword !== "";
    };

    const handleSignup = async (e) => {
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
                setError("Password is too short. Please use a password with at least 6 characters.");
                setLoading(false);
                return;
            }

            const newUser = {
                email: email,
                password: password,
                confirmPassword: confirmPassword,
            };

            await axios.post("http://localhost:8081/api/users/signup", newUser);

            const loginRes = await axios.post("http://localhost:8081/api/users/login", {
                email,
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
            setError(err.response?.data?.msg || "An error occurred while signing up.");
            console.log(err);
        }
    };

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
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Last Name:
                        <input
                            required
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Phone Number:
                        <input
                            required
                            type="text"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Email:
                        <input
                            required
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                        Opt in to receive promotional emails.
                        <br />
                    </label>
                    <br />
                    <h3>Financial Details</h3>
                    <label>
                        <br /> Card Number
                        <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                        />
                        <br />
                    </label>
                    <label>
                        <br /> CVV
                        <input
                            type="text"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                        />
                        <br />
                    </label>
                    <label>
                        <br /> Expiration Date
                        <input
                            type="text"
                            value={expirationDate}
                            onChange={(e) => setExpirationDate(e.target.value)}
                        />
                        <br />
                    </label>
                    <label>
                        <br /> Billing Address
                        <input
                            type="text"
                            value={billingAddress}
                            onChange={(e) => setBillingAddress(e.target.value)}
                        />
                        <br />
                    </label>

                    <button className="checkout-button" type="submit">Signup</button>
                </form>
                <Button className="btn" onClick={toggle}>
                    Close
                </Button>

            </div>
        </div>
    );
}

export default Signup;
