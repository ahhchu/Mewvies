import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import "./Button.css";
import Login from "./Login";
import Signup from "./Signup";
import Button from "./Button";

function Header({ token, updateToken }) {
    const [signupSeen, setSignupSeen] = useState(false);
    const [loginSeen, setLoginSeen] = useState(false);

    useEffect(() => {
        updateToken();
    }, [updateToken]);

    const toggleSignup = () => {
        setSignupSeen(!signupSeen);
    };

    const toggleLogin = () => {
        setLoginSeen(!loginSeen);
    };

    function handleLogout() {
        localStorage.clear();
        updateToken();
    }

    return (
        <div className="header">
            <div className="header__left">
                <Link className="button" to="/">
                    Home
                </Link>
                {token ? (
                    <>
                        <Link className="button" to="add-painting">
                            + Add
                        </Link>
                        <Link className="button" to="edit">
                            Edit
                        </Link>
                    </>
                ) : null}
            </div>

            <div className="header__center">
                <h2>Mew Mew Mewvies</h2>
            </div>

            <div className="header__right">
                {token ? (
                    <Button onClick={() => handleLogout()}>Logout</Button>
                ) : (
                    <>
                        <Button onClick={toggleSignup}>Signup</Button>
                        <Button onClick={toggleLogin}>Login</Button>
                        {signupSeen ? (
                            <Signup updateToken={updateToken} toggle={toggleSignup} />
                        ) : null}
                        {loginSeen ? (
                            <Login updateToken={updateToken} toggle={toggleLogin} />
                        ) : null}
                    </>
                )}
            </div>
        </div>
    );
}

export default Header;
