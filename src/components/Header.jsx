import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Login from "./Login";
import Signup from "./Signup";
import Search from "./Search";
import EditProfile from "./EditProfile";
import { useNavigate } from "react-router-dom";
import yarnImage from '../img/yarn.jpg';



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
    if (loginSeen) {
      setLoginSeen(false); //hide login
    }
    console.log("signup: " + signupSeen);
  };

  const toggleLogin = () => {
    setLoginSeen(!loginSeen);
    if (signupSeen) {
      setSignupSeen(false); //hide signup
    }
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
    setLoginSeen(false); 
    setSignupSeen(false);
    navigate("/Mewvies");
    localStorage.clear();
    updateToken();
  }

  return (
    <div className="header">
{/*       <img src={yarnImage} alt="Yarn" width="75" height="75" class='image' /> to add or not to add*/}
      <div className="title">
        <Link className="Mewvies" to="/">
          Mewvies
        </Link>
      </div>

      <div className="nav_bar">
        <div className="search-results">
        <Search /> {/*search bar */}
        </div>
        {isLoggedIn ? (
          <button className="nav">
            <Link className="nav" to="/edit-profile">
              Edit Profile
            </Link>
          </button>
        ) : (
          <>
            <button className="nav" onClick={toggleSignup}>
              Signup
            </button>
            <button className="nav" onClick={toggleLogin}>
              Login
            </button>

          
            {signupSeen ? (
              <Signup
                updateToken={updateToken}
                toggle={toggleSignup}
              />
            ) : null}
            {loginSeen && !signupSeen ? (
              <Login
                updateToken={updateToken}
                toggle={toggleLogin}
                handleLoginSuccess={handleLoginSuccess} 
              />
            ) : null}
          </>
        )}
        {isLoggedIn && (
          <button className="nav" onClick={() => handleLogout()}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
