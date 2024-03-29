import React, { useState, useEffect } from "react";
import "./EditProfile.css";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firestore";
import { getAuth } from "firebase/auth";

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
  const [billingAddress, setBillingAddress] = useState("");
  const [promo, setPromo] = useState(false);
  const [editMode, setEditMode] = useState(false); // To toggle between edit and view modes

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        const userRef = doc(db, "user", currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setFirstName(userData.fname);
          setLastName(userData.lname);
          setEmail(userData.email); // Email is not editable
          setPassword(userData.passwd);
          setPromo(userData.promo);
          setCardNumber(userData.cardNumber);
          setCVV(userData.cvv);
          setExpirationDate(userData.expirationDate);
          setBillingAddress(userData.billingAddress);
        } else {
          console.log("No such user!");
        }
      }
    };
    fetchUserData();
  }, [currentUser]);

  const handleSave = async () => {
    if (currentUser) {
      if (passwordChangeRequested && currentPassword !== password) {
        alert("Current password is incorrect. Please try again.");
        return;
      }

      const updatedData = {
        fname: firstName,
        lname: lastName,
        passwd: password,
        promo: promo || false,
        cardNumber: cardNumber,
        cvv: cvv,
        expirationDate: expirationDate,
        billingAddress: billingAddress,
      };

      const userRef = doc(db, "user", currentUser.uid);
      await updateDoc(userRef, updatedData);
      console.log("Profile updated successfully");
      setEditMode(false); // Exit edit mode after saving
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
            <p>Password: {password}</p>
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
              Expiration Date
              <input
                type="text"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
              />
            </label>
            <br />
            <label>
              Billing Address:
              <input
                type="text"
                value={billingAddress}
                onChange={(e) => setBillingAddress(e.target.value)}
              />
            </label>
          </>
        ) : (
          <>
            <p>Card Number: {cardNumber}</p>
            <p>CVV: {cvv}</p>
            <p>Expiration Date: {expirationDate}</p>
            <p>Billing Address: {billingAddress}</p>
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
