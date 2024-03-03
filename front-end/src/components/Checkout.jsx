import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./Checkout.css"; // Import your CSS file

function Checkout() {
  const [formData, setFormData] = useState({
    name: '',
    billingAddress: '',
    creditCardNumber: '',
    expirationDate: '',
    cvv: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform further actions here, e.g., send the data to a server
    console.log('Form submitted:', formData);
  };

  return (
    <div className="form-container">
      <h2>Checkout</h2>
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
          Billing Address:
          <textarea
            name="billingAddress"
            value={formData.billingAddress}
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
        <Link to="/confirmation">
          <button type="submit" className="submit-button">Submit</button>
        </Link>
      </form>
    </div>
  );
}

export default Checkout;
