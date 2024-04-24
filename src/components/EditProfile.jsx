import React, { useState, useEffect } from "react";
import "./EditProfile.css";
import "./Button.css";
import Button from "./Button";
import PaymentCard from "./PaymentCard";
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

  const [cardIndex, setCardIndex] = useState(0);

  const [editedCards, setEditedCards] = useState([]);

  var cards;

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
      //setUpdateCard(true);
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
          billing_zip: encryptData(zipCode, passphrase),
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

      var editedCards = [
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
    }
      updateUser(currentUser, updatedUserData, editedCards);

      setEditProfileDone(true);
      setEditMode(false); // Exit edit mode after saving
      //await fetchUserData();
    }
    function addCard() {
      if (editedCards.length < 3) {
        setCardIndex(prevIndex => prevIndex + 1);
        setEditedCards(prevCards => [
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
  
    function updateCard(index, field, value) {
      setEditedCards(prevCards => {
        const updatedCards = [...prevCards];
        updatedCards[index][field] = value;
        return updatedCards;
      });
    }

    function removeLastCard() {
      if (editedCards.length > 0) {
        setEditedCards(prevCards => prevCards.slice(0, -1));
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
          {editedCards.map((card, index) => (
           <> <h3>Card {index + 1}</h3>
            <PaymentCard 
            key = {index}
            cardName={card.cardName}
            cardType={card.cardType}
            cardNumber={card.cardNumber}
            cvv={card.cvv}
            expirationDate={card.expirationDate}
            billingAddressOne={card.billingAddressOne}
            billingAddressTwo={card.billingAddressTwo}
            city={card.city}
            state={card.state}
            zipCode={card.zipCode}
            setCardName={value => updateCard(index, 'cardName', value)}
    setCardType={value => updateCard(index, 'cardType', value)}
    setCardNumber={value => updateCard(index, 'cardNumber', value)}
    setCVV={value => updateCard(index, 'cvv', value)}
    setExpirationDate={value => updateCard(index, 'expirationDate', value)}
    setBillingAddressOne={value => updateCard(index, 'billingAddressOne', value)}
    setBillingAddressTwo={value => updateCard(index, 'billingAddressTwo', value)}
    setCity={value => updateCard(index, 'city', value)}
    setState={value => updateCard(index, 'state', value)}
    setZipCode={value => updateCard(index, 'zipCode', value)}
            />

            </>
          ))}
          {editedCards.length < 3 ? (
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
          {editedCards.map((card, index) => (
        <div key={index}>
          <h3>Card {index + 1}</h3>
            <p>Name on Card: {card.cardName}</p>
            <p>Card Type: {card.cardType}</p>
            <p>Card Number: {card.cardNumber}</p>
            <p>CVV: ***</p>
            <p>Expiration Date: {card.expirationDate}</p>
            <p>Billing Address One: {card.billingAddressOne}</p>
            <p>Line Two: {card.billingAddressTwo}</p>
            <p>City: {card.city}</p>
            <p>State: {card.state}</p>
            <p>Zip Code: {card.zipCode}</p>
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
