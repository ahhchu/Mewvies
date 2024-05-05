import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import "./Seats.css";
import { getMovies } from "../functionality/movie";
import { getShowingsByMovie, getShowings } from "../functionality/showing";
import { db } from "../config/firestore";
import { doc, getDocs, getDoc, collection, query, where } from "firebase/firestore";

function Seats() {
  const navigate = useNavigate();
  const { movieId, showingId } = useParams();
  const [movie, setMovie] = useState(null);
  const [showing, setShowings] = useState(null);
  const [ticketPrices, setTicketPrices] = useState({});
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [unavailableSeats, setUnavailableSeats] = useState([]);
  const [seatTypes, setSeatTypes] = useState({});
  const [activeDropdown, setActiveDropdown] = useState(null);

  /* fetch movie details */
  useEffect(() => {
    const fetchMovieDetails = async () => {
      const movies = await getMovies();
      const movieData = movies.find((element) => element.movie_id === movieId);
      if (movieData) {
        setMovie(movieData);
        console.log("Movie Name: ", movieData.movie_title);
      }

      const showingsData = await getShowingsByMovie(movieId);
      const specificShowing = showingsData.find(
        (s) => s.showing_id.toString() === showingId
      ); 
      setShowings(specificShowing); 
      console.log(showingsData);
    }

  /* fetch showing details */
    const fetchShowingDetails = async () => {
      const showingRef = doc(db, "showing", showingId);
      const showingSnap = await getDoc(showingRef);
      if (showingSnap.exists()) {
        const showingData = showingSnap.data();
        setShowings(showingData); 
        console.log("Showing Data: ", showingData);
      } else {
        console.log("No such showing!");
      }
    };

    /* fetch unavail seats */
  const fetchUnavailableSeats = async () => {
//    console.log("Showing ID:", showingId);
    const ordersRef = collection(db, "order");
    const q = query(ordersRef, where("movie_id", "==", movieId), where("showing_id", "==", showingId));
    try {
      const querySnapshot = await getDocs(q);
      const bookedSeats = querySnapshot.docs.map(doc => doc.data().seat_number); // in firestore seat_number is number type, showingid is number type, movieid is string
      setUnavailableSeats(bookedSeats);
      console.log("Unavailable Seats: ", bookedSeats);
    } catch (error) {
      console.error("Error fetching unavailable seats: ", error);
    }    
  };

  fetchMovieDetails();
  fetchShowingDetails();
  fetchUnavailableSeats();
  fetchShowingDetails();
}, [movieId, showingId]);


 /* fetch seats */
  const handleSeatSelection = (seat) => {
    const seatString = seat.toString();
    if (!unavailableSeats.includes(seatString)) {
      const updatedSeats = selectedSeats.includes(seatString)
        ? selectedSeats.filter(s => s !== seatString)
        : [...selectedSeats, seatString];
      setSelectedSeats(updatedSeats);
    } else {
      alert('This seat is unavailable.');
    }
  };

  
  const handleSeatTypeChange = (seat, type) => {
    setSeatTypes((prev) => ({ ...prev, [seat]: type }));
    setActiveDropdown(null); 
  };

  const toggleDropdown = (seat) => {
    setActiveDropdown(activeDropdown === seat ? null : seat);
  };

  const isActiveDropdown = (seat) => {
    return activeDropdown === seat;
  };
  

  /* backend code */
  const proceedToCheckout = async () => {
    // Logic to save to Firestore or prepare data to be passed to Checkout
    navigate(`/movie-details/${movieId}/seats/${showingId}/checkout`, {
      state: {
        selectedSeats,
        seatTypes,
        showingTime: new Date(showing.showing_time.seconds).toString(),
        showingId,
        movieTitle: movie.movie_title,
      },
    });
  };

  /* ticket prices */
  useEffect(() => {
    const fetchTicketPrices = async () => {
      const pricesSnapshot = await getDocs(collection(db, "ticket"));
      const pricesData = {};
      pricesSnapshot.forEach(doc => {
        pricesData[doc.id] = doc.data().price;
      });
      setTicketPrices(pricesData);
    };
  
    fetchTicketPrices();
  }, []);
  
  return (
    <div className="movieDetails">
      <h2>
        {movie
          ? `${movie.movie_title}: ${
              showing
                ? new Date(showing.showing_time.seconds).toString()
                : "Loading showing details"
            }`
          : "Loading movie details..."}
      </h2>
      <h2>Select seats:</h2>

      <h3> Screen: Front</h3> 

      <div className="seats">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((seat) => (
          <div key={seat} className="seatContainer">
            <button
              onClick={() => handleSeatSelection(seat)}
              className={
                unavailableSeats.includes(seat.toString()) ? "unavailable" :
                selectedSeats.includes(seat) ? "selected" : "seat"
              }
            />
          </div>
        ))}
      </div>

      <h3>Back</h3> 

      {selectedSeats.length > 0 && (
        <div className="selectedSeatsInfo">
          <h2>Selected Seats:</h2>
          <ul>
            {selectedSeats.map((seat) => (
              <li
                key={seat}
                style={{
                  display: "flex",
                  marginBottom: "10px",
                  justifyContent: "center",
                }}
              >
                Seat {seat} -{" "}
                {seatTypes[seat] ? (
                  seatTypes[seat]
                ) : (
                  <div className="dropdown">
                    <button
                      onClick={() => toggleDropdown(seat)}
                      className="dropbtn"
                    >
                      Select Seat Type
                    </button>
                    {isActiveDropdown(seat) && (
                  <div className="dropdown-content">
                    {Object.entries(ticketPrices).map(([type, price]) => (
                      <p key={type} onClick={() => handleSeatTypeChange(seat, `${type}: ${price}`)}>
                        {`${type.charAt(0).toUpperCase() + type.slice(1)}: ${price}`}
                      </p>
                    ))}
                  </div>
                )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedSeats.length > 0 && (
        <div className="checkout">
          <button className="checkout-button" onClick={proceedToCheckout}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Seats;
