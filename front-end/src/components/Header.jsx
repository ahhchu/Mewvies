import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
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
      <div className="title">
        <Link className = "Mewvies" to="/">Mewvies</Link>
      </div>

      <div className="nav_bar">
        <Search /> {/*search bar */}
        {isLoggedIn ? (
          <button className="nav">
          <Link className="nav" to="/edit-profile">
            Edit Profile
          </Link>
          </button>
        ) : (
          <>
            <button className = "nav">
            <Link className="nav" to="/signup">
              Signup
              </Link>
             </button>
            <button className = "nav">
            <Link className="nav" to="/login">
              Login
              </Link>
             </button>
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
        {isLoggedIn && <button className = "nav" onClick={() => handleLogout()}>Logout</button>}
      </div>
    </div>
  );
}

export default Header;
