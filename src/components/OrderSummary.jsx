import React, { useState } from "react";
//import { Link } from "react-router-dom";
import {useLocation} from 'react-router-dom';
import "./OrderSummary.css"; // Import your CSS file


function OrderSummary() {
  const location = useLocation();
  const {movieTitle, showingTime, selectedSeats, seatTypes, total} = location.state;
  return (
    <div className="form-container">
      <h2>Order Summary</h2>
      <h3>Movie: {movieTitle}</h3>
      <h3>Showtime: {new Date(showingTime).toLocaleString()}</h3>
      <h3>Tickets: </h3>
      <ul>{selectedSeats.map((seat, index) => (
          <li key={index}>
            Seat {seat}: {seatTypes[seat]}
          </li>
        ))}
      </ul>
      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
}

export default OrderSummary;
