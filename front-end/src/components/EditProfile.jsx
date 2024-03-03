import React from "react";
import "./EditProfile.css";
//import { Link } from "react-router-dom";

function EditProfile() {
  return (
    <div className = "editProfile">
    <h1>Edit Profile</h1>  <button className="profile-button"> Edit Profile </button> 
    <h2>Account Details</h2>
    <h3>First Name: </h3>
    <h3>Last Name: </h3>
    <h3>Email Address (can not change): </h3>
    <h3>Password: </h3>

    <h2>Financial Details</h2>
    <h3>Card Number: </h3>
    <h3>CVV: </h3>
    <h3>Expiration Date: </h3>
    <h3>Billing Address: </h3>

    <button className="profile-button"> Update Changes </button> 
    </div>
  )
}

export default EditProfile