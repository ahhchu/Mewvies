import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { db } from "../config/firestore";
import { Link } from "react-router-dom";
import "./Checkout.css";
import { decryptData } from "../services/crypto";
import {
  getAuth,
} from "firebase/auth";
import { getPaymentCards, passphrase } from "../functionality/User";

function Checkout() {


  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const { state } = useLocation();
  const { selectedSeats, seatTypes, showingTime, showingId, movieTitle } =
    state || {}; // location.state;
  const bookingId = location.state?.bookingId;
  const initialSeatTypes = seatTypes;
  const [editableSeatTypes, setEditableSeatTypes] = useState(initialSeatTypes);
  const [editingSeat, setEditingSeat] = useState(null);
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [fees, setFees] = useState({});  
  const [cards, setCards] = useState([]); 
  const [selectedCard, setSelectedCard] = useState(null);
  const passphrase = "webufhibejnlisuediuwe";
  const [ticketPrices, setTicketPrices] = useState({});

  const auth = getAuth();
  const currentUser = auth.currentUser; // Get the current user

  if (!currentUser) {
    console.log("No user logged in");
    navigate('/login'); // Redirect to login if no user
    return;
  }

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

  /* online fees */
  useEffect(() => {
    const fetchFees = async () => {
      const feesSnapshot = await getDocs(collection(db, "fees"));
      const feesData = {};
      feesSnapshot.forEach(doc => {
        feesData[doc.id] = doc.data().price; // assuming rates and fees could be structured differently
      });
      setFees(feesData);
    };
  
    fetchFees();
  }, []);

  useEffect(() => {
    console.log("Ticket Prices: ", ticketPrices);
    console.log("Fees: ", fees);
}, [ticketPrices, fees]);


  const renderTicketTypeDropdown = (seat) => (
    <select
      value={editableSeatTypes[seat]}
      onChange={(e) => handleTicketTypeChange(seat, e.target.value)}
      onBlur={() => setEditingSeat(null)} // Optionally close on blur
    >
      {Object.entries(ticketPrices).map(([type, price]) => (
        <option key={type} value={`${type}: ${price}`}>
          {`${type.charAt(0).toUpperCase() + type.slice(1)}: ${price}`}
        </option>
      ))}
    </select>
  );
  

  try {
    getPaymentCards(currentUser.uid).then((cardData) => {
      const decryptedCards = cardData.map(card => ({
        cardNumber: decryptData(card.card_number, passphrase),
        cardName: decryptData(card.card_name, passphrase),
        cardType: decryptData(card.card_type, passphrase),
        expirationDate: decryptData(card.expiration, passphrase),
        billingAddressOne: decryptData(card.billing_address_one, passphrase),
        billingAddressTwo: decryptData(card.billing_address_two, passphrase),
        city: decryptData(card.billing_city, passphrase),
        state: decryptData(card.billing_state, passphrase),
        zipCode: decryptData(card.billing_zip, passphrase)
      }));
      setCards(decryptedCards);
//      console.log("Cards state updated:", cards); 
    });
  } catch (e) {
    console.error("Failed to fetch or decrypt card data:", e);
  }

  const [formData, setFormData] = useState({
    name: "",
    billingAddress: "",
    creditCardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;
    console.log("Form submitted:", formData);

    if (!selectedCard) {
      alert('Please select a payment method');
      return;
    }

    console.log("User UID: ", user.uid);
    const orderData = {
      customer_id: user.uid,
      movie_id: showingId,
      order_id: "GenerateOrFetchThisID",
      payment_id: "GenerateOrFetchPaymentID", 
      promo_id: "YourPromoID", // idk how to do this 
      purchase_time: new Date().toISOString(), 
      seat_number: selectedSeats.join(", "), 
      showing_id: showingId, 
      ticket_price: total.toString(), 
      ticket_type: JSON.stringify(editableSeatTypes), 
      payment_details: {
        cardNumber: selectedCard.cardNumber,
        cardName: selectedCard.cardName,
        cardType: selectedCard.cardType,
        expirationDate: selectedCard.expirationDate,
        billingAddressOne: selectedCard.billingAddressOne,
        billingAddressTwo: selectedCard.billingAddressTwo,
        city: selectedCard.city,
        state: selectedCard.state,
        zipCode: selectedCard.zipCode
      }
    };  
  
    try {
      const docRef = await addDoc(collection(db, "order"), orderData);
      console.log("Document written with ID: ", docRef.id);
  
      navigate("/movie-details/ordersumm", {
        state: {
          movieTitle: movieTitle,
          showingTime: showingTime,
          selectedSeats: selectedSeats,
          seatTypes: editableSeatTypes,
          total: total,
        },
        replace: true,
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      if (bookingId) {
        const q = query(
          collection(db, "order"),
          where("bookingId", "==", bookingId)
        );
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

//  console.log("Received Showing Time:", showingTime);

  const handleTicketTypeChange = (seat, newType) => {
    const newSeatTypes = { ...editableSeatTypes, [seat]: newType };
    setEditableSeatTypes(newSeatTypes);
    setEditingSeat(null);
  };


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

  /* calculating price */
  useEffect(() => {
    const newSubtotal = selectedSeats.reduce((acc, seat) => {
      const priceString = editableSeatTypes[seat] && editableSeatTypes[seat].includes("$")
        ? editableSeatTypes[seat].split("$")[1]
        : "0";
      const price = parseFloat(priceString);
      return acc + price;
    }, 0);
    setSubtotal(newSubtotal);

    const tax = newSubtotal * fees.salesTax;
    const onlineFees = selectedSeats.length * fees.onlineFees;
    const totalWithTaxAndFees = newSubtotal + tax + onlineFees;
    setTotal(totalWithTaxAndFees);
  }, [selectedSeats, editableSeatTypes, fees]);


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
          <button
            className="edit-button"
            onClick={() => setEditingSeat(seat)}
          >
            Edit Ticket
          </button>
        </span>
      )}
    </li>
  ))}
</ul>


      <h3>Total: </h3>
      <h4>Ticket prices: ${subtotal.toFixed(2)}</h4>
      <h4>Sales Tax: ({(fees.salesTax * 100).toFixed(0)}%): ${(subtotal * fees.salesTax).toFixed(2)}</h4>
      <h4>Online Fees: ${(selectedSeats.length * fees.onlineFees).toFixed(2)}</h4>

      <h3>
        Total amount: $
        {(
          subtotal +
          subtotal * fees.salesTax +
          selectedSeats.length * fees.onlineFees
        ).toFixed(2)}
      </h3>

      <h2>Checkout</h2>
      <div className = "cards">
        {cards.map((card, index) => (
          <div key={index} onClick={() => setSelectedCard(card)} className="card-option">
            <p>Card Ending in {card.cardNumber.slice(-4)}</p>
            <p>Type: {card.cardType}</p>
            <p>Expires: {card.expirationDate}</p>
          </div>
        ))}
      </div>
{/*
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label className="form-label">
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </label>
          <label className="form-label">
            Billing Address One:
            <textarea
              name="billingAddressOne"
              value={formData.billingAddressOne}
              onChange={handleChange}
              required
              className="form-textarea"
            />
          </label>
          <label className="form-label">
            Billing Address Two:
            <textarea
              name="billingAddressTwo"
              value={formData.billingAddressTwo}
              onChange={handleChange}
              required
              className="form-textarea"
            />
          </label>
          <label className="form-label">
           State:
            <textarea
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="form-textarea"
            />
          </label>
          <label className="form-label">
             Zip Code:
            <textarea
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
              className="form-textarea"
            />
          </label>
          
          <label className="form-label">
            Credit Card Number:
            <input
              type="text"
              name="creditCardNumber"
              value={formData.creditCardNumber}
              onChange={handleChange}
              required
              className="form-input"
            />
          </label>
          <label className="form-label">
            Expiration Date:
            <input
              type="text"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
              required
              className="form-input"
            />
          </label>
          <label className="form-label">
            CVV:
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              required
              className="form-input"
            />
          </label>
            <button type="submit" className="submit-button">
              Confirm Payment Order
            </button>
        </form>
        </div>*/}
    </div>
  );
}

export default Checkout;
