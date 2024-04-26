import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
//import axios from "axios";
import Header from './components/Header';
import Movie from './components/Movie';
import MovieDetails from  './components/MovieDetails'
//import UserContext from './context/UserContext';
import Seats from './components/Seats';
import Search from './components/Search';
import CatMovieDetails from './components/moviesTemp/CatMovieDetails';
import Checkout from './components/Checkout';
import OrderSummary from './components/OrderSummary';
import Confirmation from "./components/Confirmation";
import ComingSoon from "./components/ComingSoon";
import Eeaao from "./components/moviesTemp/Eeaao";
import MeanGirls from './components/moviesTemp/MeanGirls';
import Dilwale from './components/moviesTemp/Dilwale';
import Saltburn from './components/moviesTemp/Saltburn';
import Admin from "./components/Admin";
import ManageMovies from './components/ManageMovies';
import ManagePromotions from './components/ManagePromotions';
import ManageUsers from './components/ManageUsers';
import Registration  from './components/Registration';
import EditProfile from  './components/EditProfile';
import MovieCard from './components/MovieCard';
import ForgotPassword from './components/ForgotPassword';
import ProtectedRoute from './components/ProtectedRoutes';
import Signup from './components/Signup';
import Login from './components/Login';
import EditMovie from "./components/EditMovie"
import ManageShowings from './components/ManageShowings';
import AddShowing from './components/AddShowing';
import AddMovie from './components/AddMovie';
import {test} from "./functionality/test"

function App() {

  test();

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
            <Route exact path="/Mewvies" element={<Movie />} />
            <Route exact path="/" element={<Movie />} />
            <Route path="/seats" element={<Seats />} />
            <Route path="/ordersumm" element={<OrderSummary />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/coming-soon" element={<ComingSoon />} />

            <Route path="/movie-details/:movieId" element={<MovieDetails />} />

            <Route path = "/registration" element = {<Registration/>} />
            <Route path ="/edit-profile" element = {<EditProfile/>} />
            <Route path = "/forgot-password" element = {<ForgotPassword/>} />

            <Route path = "/signup" element = {<Signup />} />
            <Route path = "/login" element = {<Login />} />

            <Route path = "/admin/" element = {<ProtectedRoute><Admin /> </ProtectedRoute>} />

            <Route path = "/managemovies/" element = {<ManageMovies/>} />
            <Route path = "/managepromotions/" element = {<ManagePromotions/>} />
            <Route path = "/manageusers/" element = {<ManageUsers/>} />
            <Route path='/addmovie/' element = {<AddMovie/>} />
            <Route path='/editmovie/:movieId/' element = {<EditMovie/>} />
            <Route path='/addshowing/:movieId/' element = {<AddShowing/>} /> 
            <Route path='/manageshowings/:movieID/' element = {<ManageShowings/>} /> 

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;