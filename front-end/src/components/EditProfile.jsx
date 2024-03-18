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
      <h3>First Name: </h3>
      <input type="text" placeholder="Enter first name" />
    </div>
    <div>
      <h3>Last Name: </h3>
      <input type="text" placeholder="Enter last name" />
    </div>
    <div>
      <h3>Email Address (cannot change): </h3>
      <p>user@example.com</p>
    </div>
    <div>
      <h3>Password: </h3>
      <input type="password" placeholder="Enter password" />
    </div>

    <h2>Financial Details</h2>
    <div>
      <h3>Card Number: </h3>
      <input type="text" placeholder="Enter card number" />
    </div>
    <div>
      <h3>CVV: </h3>
      <input type="text" placeholder="Enter CVV" />
    </div>
    <div>
      <h3>Expiration Date: </h3>
      <input type="text" placeholder="Enter expiration date" />
    </div>
    <div>
      <h3>Billing Address: </h3>
      <input type="text" placeholder="Enter billing address" />
    </div>

    <button className="profile-button">Update Changes</button>
  </div>
  );
}

export default EditProfile