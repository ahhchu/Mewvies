import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import {useLogin} from "../context/LoginContext";
import {useSignup} from "../context/SignupContext";
import Search from "./Search";
import {isLoggedIn, logout, isAdmin} from "../functionality/User";
import { useNavigate } from "react-router-dom";



function Header({ token, updateToken }) {

  const navigate = useNavigate();

  const openLoginPopup = useLogin();
  const openSignupPopup = useSignup();
 // const [admin, setAdmin] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const admin = localStorage.getItem('userRole');
 
  useEffect(() => {
    updateToken();
  }, [updateToken]);

  useEffect(() => {
    const checkAuthentication = () => {
      setAuthenticated(isLoggedIn());
    };
    checkAuthentication(); // Check authentication when component mounts
  }, []);
  
  useEffect(() => {
    if (admin == 'admin') {
        navigate('/admin');
    }
}, [admin]);
  

  const toggleSignup = () => {
    openSignupPopup;
    navigate('/signup');
  };

   const toggleLogin = () => {
    openLoginPopup;
    navigate('/login');
  };
 

  function handleLogout() {
    logout();

    setAuthenticated(false);

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
        {authenticated ? (
          <>
          <button className="nav">
            <Link className="nav" to="/edit-profile">
              Edit Profile
            </Link>
          </button>
          {admin == 'admin' && (
            <button className="nav">
              <Link className="nav" to="/admin">
                Admin
              </Link>
            </button>
            )}
            </>
        ) : (
          <>
            <button className="nav" onClick={toggleSignup}>
              Signup
            </button>
            <button className="nav" onClick={toggleLogin}>
              Login
            </button>

          </>
        )}
        {authenticated && (
          <button className="nav" onClick={() => handleLogout()}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
