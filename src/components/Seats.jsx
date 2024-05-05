import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import "./Seats.css";
import { getMovies } from "../functionality/movie";
import { getShowingsByMovie, getShowings } from "../functionality/showing";
import { db } from "../config/firestore";
import { doc, getDocs, getDoc, collection } from "firebase/firestore";

function Seats() {
  const location = useLocation();
  //  console.log(location.state);
  const navigate = useNavigate();

  const { movieId, showingId } = useParams();
  const [movie, setMovie] = useState(null);
  const [showing, setShowings] = useState(null);
  const [ticketPrices, setTicketPrices] = useState({});

  useEffect(() => {
    async function fetchData() {
      const movies = await getMovies();
      const movieData = movies.find((element) => element.movie_id === movieId);
      if (movieData) {
        setMovie(movieData);
        console.log("Movie Name: ", movieData.movie_title);
      }

      const showingsData = await getShowingsByMovie(movieId);
      const specificShowing = showingsData.find(
        (s) => s.showing_id.toString() === showingId
      ); // Ensure matching the ID correctly
      setShowings(specificShowing); // setShowings should set a single showing object, not an array
      console.log(showingsData);
      //      console.log(showingsData);
      //      setShowings(showingsData);
    }

    fetchData();
  }, [movieId]);

  useEffect(() => {
    const fetchShowingDetails = async () => {
      const showingRef = doc(db, "showings", showingId);
      const showingSnap = await getDoc(showingRef);
      if (showingSnap.exists()) {
        const showingData = showingSnap.data();
        setShowings(showingData); // Assuming this should have been setShowing, not setShowings
        console.log("Showing Data: ", showingData);
        // Extract and set showingTime if it's a part of showingData
        // Adjust this based on your actual data structure
      } else {
        console.log("No such showing!");
      }
    };

    fetchShowingDetails();
  }, [showingId]);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatTypes, setSeatTypes] = useState({});

  const [activeDropdown, setActiveDropdown] = useState(null);

  //  const { showingTime, showingId, movieName } = location.state || {};

  const handleSeatSelection = (seat) => {
    const updatedSeats = selectedSeats.includes(seat)
      ? selectedSeats.filter((s) => s !== seat)
      : [...selectedSeats, seat];
    setSelectedSeats(updatedSeats);
    if (!updatedSeats.includes(seat)) {
      const newSeatTypes = { ...seatTypes };
      delete newSeatTypes[seat];
      setSeatTypes(newSeatTypes);
    }
  };

  const handleSeatTypeChange = (seat, type) => {
    setSeatTypes((prev) => ({ ...prev, [seat]: type }));
    setActiveDropdown(null); // Optionally close dropdown after selection
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
      <div className="seats">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((seat) => (
          <div key={seat} className="seatContainer">
            <button
              onClick={() => handleSeatSelection(seat)}
              className={selectedSeats.includes(seat) ? "selected" : "seat"}
            />
          </div>
        ))}
      </div>

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
