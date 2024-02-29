import React from 'react'
import { Link } from "react-router-dom";

function OrderSummary() {
  return (
    <div className = "Summmary">
    <h1>Checkout</h1>
    <h2>Order Summary View: </h2>
    
    <h3>Showtime: 12:00 PM</h3>

    <h3>Ticket Type: 
        <ul>
            <li>1 Adult: $10  <button className="checkout-button"> delete/edit ticket </button>  </li>
            <li>1 Child: $5  <button className="checkout-button"> delete/edit ticket </button> </li> 
        </ul>
        Total: $15
        <button className="checkout-button"> update order </button>
    </h3>
    <Link to ="/checkout">
    <button className="checkout-button">Proceed to checkout</button> 
    </Link>
    </div>
  )
}

export default OrderSummary