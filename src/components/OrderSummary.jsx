import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firestore";
import { Link } from "react-router-dom";
import './OrderSummary.css';

function OrderSummary() {
  const [orders, setOrders] = useState([]);
  const { state }= useLocation();
  const { selectedSeats, seatTypes, showingTime, showingId, movieTitle } = state || {}; // location.state;
  const bookingId = location.state?.bookingId; 
  const initialSeatTypes = seatTypes;
  const [editableSeatTypes, setEditableSeatTypes] = useState(initialSeatTypes);
  const [editingSeat, setEditingSeat] = useState(null);
  const [total, setTotal] = useState(0);
  const SALES_TAX = 0.08; // 8% tax 
  const ONLINE_FEE = 2.00 // idk 

  

  if (!state) {
  return <p>No data available</p>; // or handle redirection
  }

  useEffect(() => {
    const fetchOrders = async () => {
      if (bookingId) {
        const q = query(collection(db, "order"), where("bookingId", "==", bookingId));
        const querySnapshot = await getDocs(q);
        const fetchedOrders = [];
        querySnapshot.forEach((doc) => {
          fetchedOrders.push(doc.data());
        });
        setOrders(fetchedOrders);
      }
    };

    fetchOrders();
  }, [bookingId]);

  if (!selectedSeats || !seatTypes) {
    return <p>No data available</p>; // or handle redirection
  }
  

  const calculateTotal = () => {
    return selectedSeats.reduce((total, seat) => {
      const priceString = seatTypes[seat].split("$")[1]; // Assumes the format "Type $Price"
      const price = parseFloat(priceString);
      return total + price;
    }, 0);
  };

  console.log("Received Showing Time:", showingTime);

  const handleTicketTypeChange = (seat, newType) => {
    const newSeatTypes = { ...editableSeatTypes, [seat]: newType };
    setEditableSeatTypes(newSeatTypes);
    setEditingSeat(null);
  };
  
  const renderTicketTypeDropdown = (seat) => (
    <select
      value={editableSeatTypes[seat]}
      onChange={(e) => handleTicketTypeChange(seat, e.target.value)}
      onBlur={() => setEditingSeat(null)}  // Optionally close on blur
    >
      <option value="Adult: 12-64 $10">Adult: $10</option>
      <option value="Child: 1-11 $5">Child: $5</option>
      <option value="Senior: 64+ $7">Senior: $7</option>
    </select>
  );

  useEffect(() => {
    const newTotal = selectedSeats.reduce((total, seat) => {
      // Make sure to split the editableSeatTypes, not seatTypes
      const priceString = editableSeatTypes[seat].split("$")[1];
      const price = parseFloat(priceString);
      return total + price;
    }, 0);
    setTotal(newTotal);
  }, [editableSeatTypes, selectedSeats]); // Listen to changes in editableSeatTypes
  
  

  useEffect(() => {
    setEditableSeatTypes(seatTypes);
  }, [seatTypes]);

  useEffect(() => {
    const subtotal = selectedSeats.reduce((total, seat) => {
      const priceString = editableSeatTypes[seat].split("$")[1];
      const price = parseFloat(priceString);
      return total + price;
    }, 0);
  
    const tax = subtotal * SALES_TAX;
    const onlineFees = selectedSeats.length * ONLINE_FEE;
    const totalWithTaxAndFees = subtotal + tax + onlineFees;
  
    setTotal(totalWithTaxAndFees);
  }, [editableSeatTypes, selectedSeats]);
  

  return (
    <div className="Summary">
      <h1>Checkout</h1>
      <h2>Order Summary View:</h2>
      
      <h3> Movie: {movieTitle} </h3>
      <h3>Showtime: {new Date(showingTime).toLocaleString()}</h3>
      <h3>Ticket Type and Prices:</h3>
      <ul>
  {selectedSeats.map((seat, index) => (
    <li key={index}>
      Seat {seat}: 
      {editingSeat === seat ? (
        renderTicketTypeDropdown(seat)
      ) : (
        <span>
          {editableSeatTypes[seat]}
          <button className="edit-button" onClick={() => setEditingSeat(seat)}>
            Edit Ticket
          </button>
        </span>
      )}
    </li>
  ))}
</ul>

    <h3>Total: </h3>
    <h4>Ticket prices: ${total.toFixed(2)}</h4>
    <h4>Sales Tax: (8%): ${(total * SALES_TAX).toFixed(2)}</h4>
    <h4>Online Fees: ${(selectedSeats.length * ONLINE_FEE).toFixed(2)}</h4>
    <h3>Total amount: ${(total + (total * SALES_TAX) + (selectedSeats.length * ONLINE_FEE)).toFixed(2)}</h3>
      <Link to="/checkout">
        <button className="checkout-button">Proceed to Checkout</button>
      </Link>
    </div>
  );
}

export default OrderSummary;
