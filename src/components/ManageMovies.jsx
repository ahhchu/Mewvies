import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import "./Button.css";
import "./Movie.css";
import Movie from "./Movie";
import Button from "./Button";
import Search from "./Search";
import { getCurrentMovies, getUpcomingMovies } from "../functionality/movie";

function ManageMovies() {
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [currentlyRunningShows, setCurrentlyRunningShows] = useState([]);


  useEffect(() => {
    getUpcomingMovies().then((data) => {
        setUpcomingMovies(data);
    })
    getCurrentMovies().then((data) => {
      setCurrentlyRunningShows(data);
    })
  }, []);

  return (
    <div className="Movie">
     <div>
            <Link to ="/manageusers">
             <Button className="manage">Manage Users</Button> 
            </Link>
            <Link to ="/managepromotions">
             <Button className="manage">Manage Promos</Button> 
            </Link>
      </div>
      <h1>Manage Movies</h1>
    <Button>
        Add Movie
    </Button>
      <h1>Currently Running</h1>
      <div className="Currently-Running">
        {currentlyRunningShows.map((show, index) => (
          <div className="MovieCard" key={index}>
            <h3>{show.movie_title}</h3>
            <Link to={show.movie_id}>
              <img
                src={show.picture}
                alt={show.movie_title}
                width="300"
              />
            </Link>
            <Button>Change Theater</Button>
            <Button>Update Details</Button>
            <Button>Delete Movie</Button>
          </div>
        ))}
      </div>
    
      <h1>Coming Soon</h1>
      <div className="Coming-Soon">
        {upcomingMovies.map((show, index) => (
          <div className="MovieCard" key={index}>
            <h3>{show.movie_title}</h3>
            <Link to="/coming-soon">
              <img
                src={show.picture}
                alt={show.movie_title}
                width="300"
              />
            </Link>
            <Button>Change Theater</Button>
            <Button>Update Details</Button>
            <Button>Delete Movie</Button>
          </div>
        ))}
      </div>
       </div>

    
  );
}

export default ManageMovies;
