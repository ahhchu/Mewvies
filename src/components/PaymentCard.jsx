import React from "react";

function PaymentCard({ index, card, updateCardField }) {
  console.log("paymentcard",card);
  const handleFieldChange = (e, field) => {
    const value = e.target.value;
    updateCardField(index, field, value); // Call update function with index
  }; 
  
  return (
    <div>
      <label>
        Name on Card:{" "}
        <input
          type="text"
          placeholder={card.card_name}
          value={card.cardName}
          onChange={(e) => handleFieldChange(e, "cardName")}
        />
      </label>
      <br />
      <label>
        Card Type:{" "}
        <input
          type="text"
          placeholder={card.card_type}
          value={card.cardType}
          onChange={(e) => handleFieldChange(e, "cardType")}
        />
      </label>
      <br />
      <label>
        Card Number:{" "}
        <input
          type="text"
          placeholder={card.card_number}
          value={card.cardNumber}
          onChange={(e) => handleFieldChange(e, "cardNumber")}
        />
      </label>
      <br />
      <label>
        CVV:{" "}
        <input
          type="text"
          placeholder={card.cvv}
          value={card.cvv}
          onChange={(e) => handleFieldChange(e, "cvv")}
        />
      </label>
      <br />
      <label>
        Expiration Date:{" "}
        <input
          type="text"
          placeholder={card.expiration_date}
          value={card.expirationDate}
          onChange={(e) => handleFieldChange(e, "expirationDate")}
        />
      </label>
      <br />
      <label>
        Billing Address Line One:{" "}
        <input
          type="text"
          placeholder={card.billing_address_one}
          value={card.billingAddressOne}
          onChange={(e) => handleFieldChange(e, "billingAddressOne")}
        />
      </label>
      <br />
      <label>
        Line two:{" "}
        <input
          type="text"
          placeholder={card.billing_address_two}
          value={card.billingAddressTwo}
          onChange={(e) => handleFieldChange(e, "billingAddressTwo")}
        />
      </label>
      <br />
      <label>
        City:{" "}
        <input
          type="text"
          placeholder={card.city}
          value={card.city}
          onChange={(e) => handleFieldChange(e, "city")}
        />
      </label>
      <br />
      <label>
        State:{" "}
        <input
          type="text"
          placeholder={card.state}
          value={card.state}
          onChange={(e) => handleFieldChange(e, "state")}
        />
      </label>
      <br />
      <label>
        Zip Code:{" "}
        <input
          type="text"
          placeholder={card.zip_code}
          value={card.zipCode}
          onChange={(e) => handleFieldChange(e, "zipCode")}
        />
      </label>
      <br />
      <br />
    </div>
  );
}

export default PaymentCard;
