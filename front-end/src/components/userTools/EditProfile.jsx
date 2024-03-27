import React, {useState} from "react";
import "./EditProfile.css";

import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../../config/firestore'

function EditProfile() {
    

 // const id = currentUser.uid;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [billingAddress, setBillingAddress] = useState("");


 // handleEditUser = async (e) => {
  //}

  return (
    <div className="editProfile">
    <h1>Edit Profile</h1>
   
    <h2>Account Details</h2>
    <div>
    <form>
    <label>
            First Name:
            <input
              required
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <br />
          <label>
            Last Name:
            <input
              required
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          <br />
          <label>
            Phone Number:
            <input
              required
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label>
            <br /> Confirm password:
            <input
              required
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <br />
          </label>
          <label>
            <input type="checkbox" />
            Opt in to receive promotional emails.
            <br />
          </label>
          <br />
          <h3>Financial Details</h3>
          <label>
            <br /> Card Number
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
            <br />
          </label>
          <label>
            <br /> CVV
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
            <br />
          </label>
          <label>
            <br /> Expiration Date
            <input
              type="text"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
            />
            <br />
          </label>
          <label>
            <br /> Billing Address
            <input
              type="text"
              value={billingAddress}
              onChange={(e) => setBillingAddress(e.target.value)}
            />
            <br />
          </label>
    <button className="profile-button" type="submit">Update Changes</button>
    </form>
  </div>
  </div>
  );
}

export default EditProfile 