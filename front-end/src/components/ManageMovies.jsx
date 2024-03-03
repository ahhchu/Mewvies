import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import "./Button.css";
import "./Movie.css";
import Movie from "./Movie";
import Button from "./Button";
import Search from "./Search";

function ManageMovies() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentIndex2, setCurrentIndex2] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % currentlyRunningShows.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + currentlyRunningShows.length) % currentlyRunningShows.length);
  };


  const handleNext2 = () => {
    setCurrentIndex2((prevIndex2) => (prevIndex2 + 1) % comingSoonShows.length);
  };

  const handlePrev2 = () => {
    setCurrentIndex2((prevIndex2) => (prevIndex2 - 1 + comingSoonShows.length) % currentlyRunningShows.length);
  };


  const currentlyRunningShows = [
    {
      name: "Cats",
      imageUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fencrypted-tbn0.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcTlhjCq92hLSM8SQ8LQY-T36pohncVV7Fhsjx3X69pEarYVe_hO&psig=AOvVaw33QSEZ0Qk-usIcW6z1GWfB&ust=1708628352705000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNDYw-GOvYQDFQAAAAAdAAAAABAE",
      trailerUrl: "https://www.youtube.com/embed/gNTDoOmc1OQ",
      link: "./cats-movie-details"
    },
    {
      name: "Everything Everywhere All At Once",
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/1/1e/Everything_Everywhere_All_at_Once.jpg",
      trailerUrl: "https://www.youtube.com/embed/wxN1T1uxQ2g",
      link: "./Everything Everywhere All At Once-movie-details",
    },
    {
      name: "Mean Girls",
      imageUrl: "https://m.media-amazon.com/images/M/MV5BNDExMGMyN2QtYjRkZC00Yzk1LTkzMDktMTliZTI5NjQ0NTNkXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_.jpg",
      trailerUrl: "https://www.youtube.com/embed/fFtdbEgnUOk",
      link: "./mean Girls-movie-details",
    },
    {
      name: "Dilwale",
      imageUrl: "https://m.media-amazon.com/images/M/MV5BOTUxODBjMDgtNTA3Zi00OTg0LTk5YTktYzY2ZGJlZDkwMzFlXkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_.jpg",
      trailerUrl: "https://www.youtube.com/embed/AHuOo1DLcRc",
      link: "./dilwale-movie-details"
    },
    {
      name: "Saltburn",
      imageUrl: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSjRpxUmP5Ksf0ouDnq1IMpMljlG9Mb4lInufOSiazqX67TsTqmY_6hnpRUmT85omFtwq_XBQ",
      trailerUrl: "https://www.youtube.com/embed/lALMdJf6UUE",
      link: "./saltburn-movie-details"
    },
  ];

  const comingSoonShows = [
    {
      name: "Kung Fu Panda 4",
      imageUrl: "https://s3.amazonaws.com/nightjarprod/content/uploads/sites/261/2023/12/21180513/v77WjVsTMPKTpXZoW2RVNegappO-scaled.jpg",
      trailerUrl: "https://www.youtube.com/embed/_inKs4eeHiI&t=1s",
    },
    {
      name: "Despicable Me 4",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJdFczRC-KPmGK3Uu41CvMWoXlINPO4-ShDb4mkgIlDmcUuncw62Z8V54T_owSHFIakkhJVw",
      trailerUrl: "https://www.youtube.com/embed/HK7EEO8jpOE",
    },
    {
      name: "Inside Out 2",
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/f/f7/Inside_Out_2_poster.jpg",
      trailerUrl: "https://www.youtube.com/embed/VWavstJydZU",
    },
    {
      name: "Sonic the Hedgehog 3",
      imageUrl: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f452aa2c-0c64-4bbf-b065-942b8dbda8bb/df3h6xn-2b46f4c6-89de-464a-ad1b-279c0854ee26.jpg/v1/fill/w_1280,h_1965,q_75,strp/sonic_the_hedgehog_3_by_diamonddead_art_df3h6xn-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTk2NSIsInBhdGgiOiJcL2ZcL2Y0NTJhYTJjLTBjNjQtNGJiZi1iMDY1LTk0MmI4ZGJkYThiYlwvZGYzaDZ4bi0yYjQ2ZjRjNi04OWRlLTQ2NGEtYWQxYi0yNzljMDg1NGVlMjYuanBnIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.sMHbVqpwggbQYOOioGc9MPTzcm0keNeFBa-rmu_ECxE",
      trailerUrl: "https://www.youtube.com/embed/S5wdFSRYoOY",
    },
    {
      name: "Imaginary",
      imageUrl: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR4-uwMZ78zFgLEpr_q39mECGFrwfiM19CwQXCqLg7HAYNdue09qDrfBq_KO_r4GrW_xZXANg",
      trailerUrl: "https://www.youtube.com/embed/8XoNfrgrAGM",
    },
  ];

  return (
    <div className="Movie">
     <div>
            <Link to ="/manageusers">
             <Button className="manage">Manage Users</Button> 
            </Link>
            <Link to ="/managepromotions">
             <Button className="manage">Manage Promotions</Button> 
            </Link>
      </div>
      <h1>Manage Movies</h1>
    <Button>
        Add Movie
    </Button>
      <h1>Currently Running</h1>
      <div className="Currently-Running">
        {currentlyRunningShows.map((show, index) => (
          <div className="MovieCard" key={index} style={{ opacity: index === currentIndex ? 1 : 0.5 }}>
            <h3>{show.name}</h3>
            <Link to={show.link}>
              <img
                src={show.imageUrl}
                alt={show.name}
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
        {comingSoonShows.map((show, index) => (
          <div className="MovieCard" key={index} style={{ opacity: index === currentIndex2 ? 1 : 0.5 }}>
            <h3>{show.name}</h3>
            <Link to="/coming-soon">
              <img
                src={show.imageUrl}
                alt={show.name}
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
