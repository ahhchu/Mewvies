import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import "./Button.css";
import Login from "./userTools/Login";
import Signup from "./userTools/Signup";
import Button from "./Button";
import Search from "./Search";
import EditProfile from "./userTools/EditProfile";
import { useNavigate } from "react-router-dom";

function Header({ token, updateToken }) {
  const navigate = useNavigate();

  const [signupSeen, setSignupSeen] = useState(false);
  const [loginSeen, setLoginSeen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    updateToken();
  }, [updateToken]);

  const toggleSignup = () => {
    setSignupSeen(!signupSeen);
  };

  const toggleLogin = () => {
    setLoginSeen(!loginSeen);
  };

  function handleLoginSuccess(userRole) {
    setIsLoggedIn(true);
    if (userRole === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  }

  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.clear();
    updateToken();
  }

  return (
    <div className="header">
      <div className="header__left">
        <Link className="button" to="/">
          Home
        </Link>
        <Search /> {/*search bar */}
      </div>

      <div className="header__center">
        <h2>Mewvies</h2>
      </div>

      <div className="header__right">
        {isLoggedIn ? (
          <Link className="button" to="/edit-profile">
            Edit Profile
          </Link>
        ) : (
          <>
            <Button onClick={toggleSignup}>Signup</Button>
            <Button onClick={toggleLogin}>Login</Button>
            {signupSeen ? (
              <Signup
                updateToken={updateToken}
                toggle={toggleSignup}
                //setIsLoggedIn={setIsLoggedIn} // Pass setIsLoggedIn to Signup component
              />
            ) : null}
            {loginSeen ? (
              <Login
                updateToken={updateToken}
                toggle={toggleLogin}
                handleLoginSuccess={handleLoginSuccess} // Pass handleLoginSuccess to Login
              />
            ) : null}
          </>
        )}
        {isLoggedIn && <Button onClick={() => handleLogout()}>Logout</Button>}
      </div>
    </div>
  );
}

export default Header;
