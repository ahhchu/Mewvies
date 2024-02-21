import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; 
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import Movie from './components/Movie';

import UserContext from './context/UserContext';

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
            <Route path="/movie" element={<Movie />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
