import React from "react";

function PaymentCard({
  cardName,
  cardType,
  cardNumber,
  cvv,
  expirationDate,
  billingAddressOne,
  billingAddressTwo,
  city,
  state,
  zipCode,
 
  setCardName,
  setCardType,
  setCardNumber,
  setCVV,
  setExpirationDate,
  setBillingAddressOne,
  setBillingAddressTwo,
  setCity,
  setState,
  setZipCode,
}) {
  return (
    <div>
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
        Zip Code:{" "}
        <input
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
      </label>
      <br />
      <br />
    </div>
  );
}

export default PaymentCard;
