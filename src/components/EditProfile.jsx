import React, { useState, useEffect } from "react";
import "./EditProfile.css";
import "./Button.css";
import Button from "./Button";
import PaymentCard from "./PaymentCard";
import {
  getAuth
} from "firebase/auth";
import { fetchUserData, getPaymentCards, changePassword, updateUser } from "../functionality/User";
import { decryptData, encryptData } from "../services/crypto";

function EditProfile() {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(""); // Email will be read-only
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [passwordChangeRequested, setPasswordChangeRequested] = useState(false);

  const [homeAddressOne, setHomeAddressOne] = useState("");
  const [homeAddressTwo, setHomeAddressTwo] = useState("");
  const [homeCity, setHomeCity] = useState("");
  const [homeState, setHomeState] = useState("");
  const [homeZipCode, setHomeZipCode] = useState("");

  const [promo, setPromo] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editProfileDone, setEditProfileDone] = useState(false);

  const [cardIndex, setCardIndex] = useState(false);
  const [editedCards, setEditedCards] = useState([]);

  const passphrase = "webufhibejnlisuediuwe";



  //var cards;

  const [updatedCards, setUpdatedCards] = useState([
    {
      card_name: "",
      card_type: "",
      card_number: "",
      cvv: "",
      expiration: "",
      billing_address_one: "",
      billing_address_two: "",
      billing_city: "",
      billing_state: "",
      billing_zip: ""
    }
  ]);

if (!editMode){
  try {
    //user data, fetch and set to fields
  fetchUserData(currentUser).then((userData) => {
        setFirstName(userData.fname);
        setLastName(userData.lname);
        setEmail(userData.email); // Email is not editable
        setPromo(userData.promo);
        setHomeAddressOne(userData.home_address_one);
        setHomeAddressTwo(userData.home_address_two);
        setHomeCity(userData.home_city);
        setHomeState(userData.home_state);
        setHomeZipCode(userData.home_zip);
  });

} catch (e) {
  console.log(e);
}
} 

useEffect(() => {
  fetchUserData();

  getPaymentCards(currentUser.uid).then((cardData) => {
    console.log("retrieved" + JSON.stringify(cardData));
    setUpdatedCards(cardData);
  });
}, [currentUser]);

useEffect(() => {
  console.log("updated", JSON.stringify(updatedCards));
}, [updatedCards]);

  async function handleSave() {
    if (currentUser) {
      if (passwordChangeRequested) {
        changePassword(currentUser, currentPassword, password);
      }

      var updatedUserData = {

        fname: firstName,
        lname: lastName,
        promo: promo || false,

        homeAddressOne: homeAddressOne,
        homeAddressTwo: homeAddressTwo,
        homeCity: homeCity,
        homeState: homeState,
        homeZipCode: homeZipCode,
      };

      console.log("encrypted");

      const updatedCardsData = updatedCards.map(card => ({
        card_name: encryptData(card.card_name, passphrase),
        card_number: encryptData(card.card_number, passphrase),
        card_type: encryptData(card.card_type, passphrase),
        expiration: encryptData(card.expiration, passphrase),
        billing_address_one: encryptData(card.billing_address_one, passphrase),
        billing_address_two: encryptData(card.billing_address_two, passphrase),
        billing_city: encryptData(card.billing_city, passphrase),
        billing_state: encryptData(card.billing_state, passphrase),
        billing_zip: encryptData(card.billing_zip, passphrase),
      }));
      updateUser(currentUser, updatedUserData, updatedCardsData);

      setEditProfileDone(true);
      setEditMode(false); // Exit edit mode after saving
      //await fetchUserData();
    }
  }

    function addCard() {
      if (updatedCards.length < 3) {
        setCardIndex(prevIndex => prevIndex + 1);
        setUpdatedCards(prevCards => [
          ...prevCards,
          {
            card_name: "",
            card_number: "",
            card_type: "",
            expiration: "",
            billing_address_one: "",
            billing_address_two: "",
            billing_city: "",
            billing_state: "",
            billing_zip: ""
          }
        ]);
      }
    }
  
    const updateCard = (index, field, value) => {
      const updatedCardsCopy = [...updatedCards];
      const updatedCard = { ...updatedCardsCopy[index] };
      updatedCard[field] = value;
      updatedCardsCopy[index] = updatedCard;
      setUpdatedCards(updatedCardsCopy);
    };

    function removeLastCard() {
      if (updatedCards.length > 0) {
        setUpdatedCards(prevCards => prevCards.slice(0, -1));
        setCardIndex(prevIndex => prevIndex - 1);
      }
    }
  

    return (
      <div className="editProfile">
        <h1>Edit Profile</h1>
        <h2>Account Details</h2>
        <div>
          {editMode ? (
            <>
              <label>
                First Name: {" "}
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <br />
              <label>
                Last Name:{" "}
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
              <p>Email:{" "} {email}</p>
              {passwordChangeRequested && (
                <>
                  <label>
                    Current Password:{" "}
                    <input
                      type="password"
                      placeholder="Current Password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                  </label>
                  <br />
                  <label>
                    New Password:{" "}
                    <input
                      type="password"
                      placeholder="New Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </label>
                  <br />
                </>
              )}
              <label>
                <input
                  type="checkbox"
                  checked={passwordChangeRequested}
                  onChange={(e) => setPasswordChangeRequested(e.target.checked)}
                />
                Change Password
              </label>
              <br />
  
              <label>
                Home Address:{" "}
                <input
                  type="text"
                  value={homeAddressOne}
                  onChange={(e) => setHomeAddressOne(e.target.value)}
                />
              </label>
              <br />
  
              <label>
                Address Line 2:{" "}
                <input
                  type="text"
                  value={homeAddressTwo}
                  onChange={(e) => setHomeAddressTwo(e.target.value)}
                />
              </label>
              <br />
  
              <label>
                City:{" "}
                <input
                  type="text"
                  value={homeCity}
                  onChange={(e) => setHomeCity(e.target.value)}
                />
              </label>
              <br />
              <label>
                State:{" "}
                <input
                  type="text"
                  value={homeState}
                  onChange={(e) => setHomeState(e.target.value)}
                />
              </label>
              <br />
  
              <label>
                Zip Code:{" "}
                <input
                  type="text"
                  value={homeZipCode}
                  onChange={(e) => setHomeZipCode(e.target.value)}
                />
                <br />
              </label>
              <br />
  
              <input
                type="checkbox"
                checked={promo}
                onChange={(e) => setPromo(e.target.checked)}
              />
              Opt in to receive promotional emails.
            </>
          ) : (
            <>
              <p>First Name: {firstName}</p>
              <p>Last Name: {lastName}</p>
              <p>Email: {email}</p>
              <p>Password: ###</p>
  
              <p>Home Address Line One : {homeAddressOne}</p>
              <p>Line Two: {homeAddressTwo}</p>
              <p>City: {homeCity}</p>
              <p>State: {homeState}</p>
              <p>Zip Code: {homeZipCode}</p>
  
              <p>Promotional Emails: {promo ? "Yes" : "No"}</p>
            </>
          )}
        </div>
        <h2>Financial Details</h2>
        <div>
          {editMode ? (
            <>
            {updatedCards.map((card, index) => (
             <div key={index}> 
             <h3>Card {index + 1}</h3>
             <PaymentCard
            key={index}
            index={index} // Pass index of the card
            card={card} // Pass card properties
            updateCardField={updateCard} // Pass update function
          />
  
              </div>
            ))}
            {updatedCards.length < 3 ? (
              <>
              <div className="button-container">
                <div className="button-row">
                  <Button onClick={() => addCard()}>Add Another Payment Option</Button>
                  <Button onClick={removeLastCard}>Delete Card</Button>
                  </div>
                </div>
                </>
              ) : (
                <>
                <p>Maximum of 3 cards reached</p>
                <Button onClick={removeLastCard}>Delete Card</Button>
                </>
              )}
            </>
            
                    ) : (
            <>
            {updatedCards.map((card, index) => (
          <div key={index}>
            <h3>Card {index + 1}</h3>
              <p>Name on Card: {card.card_name}</p>
              <p>Card Type: {card.card_type}</p>
              <p>Card Number: {card.card_number}</p>
              <p>CVV: ***</p>
              <p>Expiration Date: {card.expiration}</p>
              <p>Billing Address One: {card.billing_address_one}</p>
              <p>Line Two: {card.billing_address_two}</p>
              <p>City: {card.billing_city}</p>
              <p>State: {card.billing_state}</p>
              <p>Zip Code: {card.billing_zip}</p>
            </div>
                    ))}
            </>
          )}
        </div>
        {editMode ? (
          <>
          <br/>
          <Button onClick={handleSave}>Save</Button>
          </>
      ) : (
        <Button onClick={() => setEditMode(true)}>Edit</Button>
      )}
    </div>
);
}

export default EditProfile;
