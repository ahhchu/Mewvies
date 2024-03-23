import React from "react";
import "./EditProfile.css";
//import { Link } from "react-router-dom";

function EditProfile() {
  return (
    <div className="editProfile">
    <h1>Edit Profile</h1>
    <button className="profile-button">Edit Profile</button>

    <h2>Account Details</h2>
    <div>

    <div class="align-input">
      <h3>First Name: </h3>
      <input type="text" placeholder="Enter first name" />
    </div>
    </div>
    <div>
    <div class="align-input">
      <h3>Last Name: </h3>
      <input type="text" placeholder="Enter last name" />
    </div>
    </div>
    <div>
    <div class="align-input">
      <h3>Email Address (cannot change): </h3>
      <p> user@example.com</p>
    </div>
    </div>
    <div>
    <div class="align-input">
      <h3>Password: </h3>
      <input type="password" placeholder="Enter password" />
    </div>
    </div>

    <h2>Financial Details</h2>
    <div>
    <div class="align-input">
      <h3>Card Number: </h3>
      <input type="text" placeholder="Enter card number" />
    </div>
    </div>
    <div>
    <div class="align-input">
      <h3>CVV: </h3>
      <input type="text" placeholder="Enter CVV" />
    </div>
    </div>
    <div>
    <div class="align-input">
      <h3>Expiration Date: </h3>
      <input type="text" placeholder="Enter expiration date" />
    </div>
    </div>
    <div>
    <div class="align-input">
      <h3>Billing Address: </h3>
      <input type="text" placeholder="Enter billing address" />
    </div>
    </div>
    <div>
      <input type="checkbox" id="opt-in"></input>
      <label for="opt-in">Opt in to recieve promotional emails. </label>
    </div>
    <button className="profile-button">Update Changes</button>
  </div>
  );
}

export default EditProfile