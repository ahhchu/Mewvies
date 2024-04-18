import React, { useState, useEffect } from "react";
import "./EditProfile.css";
import "./Button.css";
import Button from "./Button";
import { doc, getDoc, updateDoc, collection, setDoc } from "firebase/firestore";
import { db } from "../config/firestore";
import { decryptData, encryptData } from "../services/crypto";
import {
  getAuth,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { fetchUserData, getPaymentCards, passphrase, changePassword, updateUser } from "../functionality/User";

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

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardType, setCardType] = useState("");
  const [cvv, setCVV] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  const [billingAddressOne, setBillingAddressOne] = useState("");
  const [billingAddressTwo, setBillingAddressTwo] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  const [promo, setPromo] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editProfileDone, setEditProfileDone] = useState(false);

  const [paymentOptions, setPaymentOptions] = useState([]);

  const passphrase = "webufhibejnlisuediuwe";

  const [updateCard, setUpdateCard] = useState(false);

  var cards;
  var editedCards;
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
//card data, fetch and set to fields
  getPaymentCards(currentUser.uid).then((cardData) => {
    console.log(cardData);
    if (cardData.length > 0) {
      setUpdateCard(true);
      setCardNumber(decryptData(cardData[0].card_number,passphrase));
      setCardName(decryptData(cardData[0].card_name, passphrase));
      setCardType(decryptData(cardData[0].card_type, passphrase));
      setExpirationDate(decryptData(cardData[0].expiration, passphrase));
      setBillingAddressOne(decryptData(cardData[0].billing_address_one, passphrase));
      setBillingAddressTwo(decryptData(cardData[0].billing_address_two, passphrase));
      setCity(decryptData(cardData[0].billing_city, passphrase));
      setState(decryptData(cardData[0].billing_state, passphrase));
      setZipCode(decryptData(cardData[0].billing_zip, passphrase));
    }
});
} catch (e) {
  console.log(e);
}
}

  useEffect(() => {
    fetchUserData();
  }, [currentUser]);

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
      var cards = [
        { // card #1
          card_name: encryptData(cardName, passphrase),
          card_number: encryptData(cardNumber, passphrase),
          card_type: encryptData(cardType, passphrase),
          expiration: encryptData(expirationDate, passphrase),
          billing_address_one: encryptData(billingAddressOne, passphrase),
          billing_address_two: encryptData(billingAddressTwo, passphrase),
          billing_city: encryptData(city, passphrase),
          billing_state: encryptData(state, passphrase),
          billing_zip: encryptData(zipCode, passphrase)
        },
        { // card #2
          card_name: encryptData(cardName, passphrase),
          card_number: encryptData(cardNumber, passphrase),
          card_type: encryptData(cardType, passphrase),
          expiration: encryptData(expirationDate, passphrase),
          billing_address_one: encryptData(billingAddressOne, passphrase),
          billing_address_two: encryptData(billingAddressTwo, passphrase),
          billing_city: encryptData(city, passphrase),
          billing_state: encryptData(state, passphrase),
          billing_zip: encryptData(zipCode, passphrase)
        },
        { // card #3
          card_name: encryptData(cardName, passphrase),
          card_number: encryptData(cardNumber, passphrase),
          card_type: encryptData(cardType, passphrase),
          expiration: encryptData(expirationDate, passphrase),
          billing_address_one: encryptData(billingAddressOne, passphrase),
          billing_address_two: encryptData(billingAddressTwo, passphrase),
          billing_city: encryptData(city, passphrase),
          billing_state: encryptData(state, passphrase),
          billing_zip: encryptData(zipCode, passphrase)
        },
      ]

      updateUser(currentUser, updatedUserData, cards);

      setEditProfileDone(true);
      setEditMode(false); // Exit edit mode after saving
      //await fetchUserData();
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
          <label>
              Name on Card:{" "}
              <input
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
            </label>
            <br />
            <label>
              Card Type:{" "}
              <input
                type="text"
                value={cardType}
                onChange={(e) => setCardType(e.target.value)}
              />
            </label>
            <br />
            <label>
              Card Number:{" "}
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </label>
            <br />
            <label>
              CVV:{" "}
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCVV(e.target.value)}
              />
            </label>
            <br />
            <label>
              Expiration Date:{" "}
              <input
                type="text"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
              />
            </label>
            <br />
            <label>
              Billing Address Line One:{" "}
              <input
                type="text"
                value={billingAddressOne}
                onChange={(e) => setBillingAddressOne(e.target.value)}
              />
            </label>
            <br />
            <label>
              Line two:{" "}
              <input
                type="text"
                value={billingAddressTwo}
                onChange={(e) => setBillingAddressTwo(e.target.value)}
              />
            </label>
            <br />
            <label>
              City:{" "}
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </label>
            <br />
            <label>
              State:{" "}
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </label>
            <br />
            <label>
              ZipCode:{" "}
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </label>


          </>
        ) : (
          <>
            <p>Name on Card: {cardName}</p>
            <p>Card Type: {cardType}</p>
            <p>Card Number: {cardNumber}</p>
            <p>CVV: ***</p>
            <p>Expiration Date: {expirationDate}</p>
            <p>Billing Address One: {billingAddressOne}</p>
            <p>Line Two: {billingAddressTwo}</p>
            <p>City: {city}</p>
            <p>State: {state}</p>
            <p>Zip Code: {zipCode}</p>

          </>
        )}
      </div>
      {editMode ? (
        <> 
        < br/>
        <Button>Add Another Payment Option</Button>
        < br/>
        < br/>
        <Button onClick={handleSave}>Save</Button>
        </>
      ) : (
        <Button onClick={() => setEditMode(true)}>Edit</Button>
      )}
    </div>
  );
}

export default EditProfile;
