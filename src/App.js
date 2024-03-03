import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
//import axios from "axios";
import Header from './components/Header';
//import Login from './components/Login';
//import Signup from './components/Signup';
import Movie from './components/Movie';
import MovieDetails from  './components/MovieDetails'
//import UserContext from './context/UserContext';
import Seats from './components/Seats';
import Search from './components/Search';
import CatMovieDetails from './components/CatMovieDetails';
import Checkout from './components/Checkout';
import OrderSummary from './components/OrderSummary';
import Confirmation from "./components/Confirmation";
import ComingSoon from "./components/ComingSoon";
import Eeaao from "./components/Eeaao";
import MeanGirls from './components/MeanGirls';
import Dilwale from './components/Dilwale';
import Saltburn from './components/Saltburn';
import Admin from "./components/Admin";
import ManageMovies from './components/ManageMovies';
import ManagePromotions from './components/ManagePromotions';
import ManageUsers from './components/ManageUsers';
import Registration  from './components/Registration';
import EditProfile from './components/EditProfile';

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
            <Route path="/cats-movie-details" element={<CatMovieDetails />} />
            <Route path="/ordersumm" element={<OrderSummary />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="/Everything Everywhere All At Once-movie-details" element={<Eeaao />} />
            <Route path="/mean girls-movie-details" element={<MeanGirls />} />
            <Route path="/dilwale-movie-details" element={<Dilwale />} />
            <Route path="/saltburn-movie-details" element={<Saltburn />} />
            <Route path = "/registration" element = {<Registration/>} />
            <Route path ="/edit-profile" element = {<EditProfile/>} />

            <Route path = "/admin/" element = {<Admin/>} />
            <Route path = "/managemovies/" element = {<ManageMovies/>} />
            <Route path = "/managepromotions/" element = {<ManagePromotions/>} />
            <Route path = "/manageusers/" element = {<ManageUsers/>} />
            

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
