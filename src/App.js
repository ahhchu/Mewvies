import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import axios from "axios";
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import Movie from './components/Movie';
import MovieDetails from  './components/MovieDetails'
import UserContext from './context/UserContext';
import Seats from './components/Seats';
import Search from './components/Search';

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  const [token, setToken] = useState();

  function setTokenFromLocalStorage() {
    setToken(localStorage.getItem("auth-token"));
  }

  useEffect(() => {
    document.title = 'Mew Mew Mewvies';
  }, []);

  return (
    <Router> 
      <div className="App">
        <Header token={token} updateToken={setTokenFromLocalStorage} />
        <main className="App-main">
          <Routes>
            <Route exact path="/search-bar" element={<Search />} />
            <Route exact path="/MewMewMewvies" element={<Movie />} />
            <Route exact path="/" element={<Movie />} />
            <Route path="/seats" element={<Seats />} />
            <Route path="/movie-details" element={<MovieDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
