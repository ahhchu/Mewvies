import React from 'react'
import { Link } from "react-router-dom";

function OrderSummary() {
  return (
    <div className = "Summmary">
    <h1>Checkout</h1>
    <h2>Order Summary View: </h2>

    <h3>Ticket Type: 
        <ul>
            <li>1 Adult: $10 </li>
            <li>1 Child: $5</li>
        </ul>
        Total: $15
    </h3>
    <Link to ="/checkout">
    <button className="checkout-button">Proceed to checkout</button> 
    </Link>
    </div>
  )
}

export default OrderSummary