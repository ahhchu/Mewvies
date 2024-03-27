//import React from 'react';
import React, { useContext, useState } from "react";
import "./ForgotPassword.css";
import "../Button.css";
import Button from "../Button";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/UserContext"

function ForgotPassword({ toggle, updateToken }) {
    // used https://dev.to/afromatt6288/create-a-popup-form-for-login-and-then-style-it-37jl
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setUserData } = useContext(UserContext);

    async function changePassword(e) {
        e.preventDefault();
        setLoading(true);
        try {
            // Check if email matches
            if (email !== confirmPassword) {
                setError("Please make sure you have entered the correct email.");
                setLoading(false);
                return;
            }

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
    console.log("Error state:", error);

return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Forgot password</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={changePassword}>
                    <label className="field">
                        Email:
                        <input
                            required
                            type="text"
                        />
                    </label>
                    <Button className="btn" type="submit">
                        Send reset link
                    </Button>
                </form>
                <Button className="btn" onClick={toggle}>
                    Close
                </Button>
                <br />
            </div>
        </div>
    );
}


export default ForgotPassword;
