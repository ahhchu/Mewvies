import React, { useState, useEffect } from "react";
import "./EditProfile.css";
import { doc, getDoc, updateDoc, collection, setDoc } from "firebase/firestore";
import { db } from "../../config/firestore";
import { encryptData, decryptData } from "../../services/crypto";
import {
  getAuth,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";

function EditProfile() {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(""); // Email will be read-only
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [passwordChangeRequested, setPasswordChangeRequested] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCVV] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  //  const [billingAddress, setBillingAddress] = useState("");

  const [homeAddressOne, setHomeAddressOne] = useState("");
  const [homeAddressTwo, setHomeAddressTwo] = useState("");
  const [homeCity, setHomeCity] = useState("");
  const [homeState, setHomeState] = useState("");
  const [homeZipCode, setHomeZipCode] = useState("");

  const [billingAddressOne, setBillingAddressOne] = useState("");
  const [billingAddressTwo, setBillingAddressTwo] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  const [promo, setPromo] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editProfileDone, setEditProfileDone] = useState(false);

  const passphrase = "sdjliwehbfib28y82huiadb";

  const [updateCard, setUpdateCard] = useState(false);

  const fetchUserData = async () => {
    if (currentUser) {
      const userRef = doc(db, "user", currentUser.uid);
      const userSnap = await getDoc(userRef);

      const cardRef = doc(db, "payment_info", currentUser.uid);
      const cardSnap = await getDoc(cardRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        setFirstName(userData.fname);
        setLastName(userData.lname);
        setEmail(userData.email); // Email is not editable
        setPromo(userData.promo);

        setHomeAddressOne(userData.homeAddressOne);
        setHomeAddressTwo(userData.homeAddressTwo);
        setHomeCity(userData.homeCity);
        setHomeState(userData.homeState);
        setHomeZipCode(userData.homeZipCode);
      } else {
        console.log("No such user!");
      }

      if (cardSnap.exists()) {
        console.log("Card exists");
        const cardData = cardSnap.data();
        
        setUpdateCard(true);
        setCardNumber(decryptData(cardData.cardNumber,passphrase));
        setCVV(decryptData(cardData.cvv, passphrase));
        setExpirationDate(decryptData(cardData.expirationDate, passphrase));
        setBillingAddressOne(decryptData(cardData.billingAddressOne, passphrase));
        setBillingAddressTwo(decryptData(cardData.billingAddressTwo, passphrase));
        setCity(decryptData(cardData.city, passphrase));
        setState(decryptData(cardData.state, passphrase));
        setZipCode(decryptData(cardData.zipCode, passphrase));
      } else {
        console.log("No card!");
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [currentUser]);

  const handleSave = async () => {
    if (currentUser) {
      if (passwordChangeRequested) {
        const credential = EmailAuthProvider.credential(
          currentUser.email,
          currentPassword
        );
        try {
          await reauthenticateWithCredential(currentUser, credential);
          await updatePassword(currentUser, password);
          console.log("Password updated successfully");
        } catch (error) {
          consoApplicationlicationerror("Error updating password:", error);
          alert(
            "Error updating password. Please make sure your current password is correct and try again."
          );
          return;
        }
      }

      const encryptedCardNum = encryptData(cardNumber, passphrase);
      const encryptedCvv = encryptData(cvv, passphrase);
      const encryptedExpirationDate = encryptData(expirationDate, passphrase);
      const encryptedBillingAddressOne = encryptData(billingAddressOne, passphrase);
      const encryptedBillingAddressTwo = encryptData(billingAddressTwo, passphrase);
      const encryptedCity = encryptData(city, passphrase);
      const encryptedState = encryptData(state, passphrase);
      const encryptedZipCode = encryptData(zipCode, passphrase);

      const updatedUserData = {
        fname: firstName,
        lname: lastName,
        promo: promo || false,

        homeAddressOne: homeAddressOne,
        homeAddressTwo: homeAddressTwo,
        homeCity: homeCity,
        homeState: homeState,
        homeZipCode: homeZipCode,
      };


      if (updateCard) {
      const updatedCardData = {
        cardNumber: encryptedCardNum,
        cvv: encryptedCvv,
        expirationDate: encryptedExpirationDate,
        billingAddressOne: encryptedBillingAddressOne,
        billingAddressTwo: encryptedBillingAddressTwo,
        city: encryptedCity,
        state: encryptedState,
        zipCode: encryptedZipCode,

      };
      const cardRef = doc(db, "payment_info", currentUser.uid);
      await updateDoc(cardRef, updatedCardData);
      }

      const userRef = doc(db, "user", currentUser.uid);
      await updateDoc(userRef, updatedUserData);
      console.log("Profile updated successfully");

      setEditProfileDone(true);
      setEditMode(false); // Exit edit mode after saving
      await fetchUserData();
    }
  };

  return (
    <div className="editProfile">
      <h1>Edit Profile</h1>
      <h2>Account Details</h2>
      <div>
        {editMode ? (
          <>
            <label>
              First Name:
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <br />
            <label>
              Last Name:
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
            <p>Email: {email}</p>
            {passwordChangeRequested && (
              <>
                <label>
                  Current Password:
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
                  New Password:
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
              Address Line 2:
              <input
                type="text"
                value={homeAddressTwo}
                onChange={(e) => setHomeAddressTwo(e.target.value)}
              />
            </label>
            <br />

            <label>
              City:
              <input
                type="text"
                value={homeCity}
                onChange={(e) => setHomeCity(e.target.value)}
              />
            </label>
            <br />
            <label>
              State:
              <input
                type="text"
                value={homeState}
                onChange={(e) => setHomeState(e.target.value)}
              />
            </label>
            <br />

            <label>
              Zip Code:
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
              Card Number:
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </label>
            <br />
            <label>
              CVV:
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCVV(e.target.value)}
              />
            </label>
            <br />
            <label>
              Expiration Date:
              <input
                type="text"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
              />
            </label>
            <br />
            <label>
              Billing Address Line One:
              <input
                type="text"
                value={billingAddressOne}
                onChange={(e) => setBillingAddressOne(e.target.value)}
              />
            </label>
            <br />
            <label>
              Line two:
              <input
                type="text"
                value={billingAddressTwo}
                onChange={(e) => setBillingAddressTwo(e.target.value)}
              />
            </label>
            <br />
            <label>
              City:
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </label>
            <br />
            <label>
              State:
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </label>
            <br />
            <label>
              ZipCode:
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </label>

            
          </>
        ) : (
          <>
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
        <button onClick={handleSave}>Save</button>
      ) : (
        <button onClick={() => setEditMode(true)}>Edit</button>
      )}
    </div>
  );
}

export default EditProfile;
