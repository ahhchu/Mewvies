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
          value={card.card_name}
          onChange={(e) => handleFieldChange(e, "card_name")}
        />
      </label>
      <br />
      <label>
        Card Type:{" "}
        <input
          type="text"
          placeholder={card.card_type}
          value={card.card_type}
          onChange={(e) => handleFieldChange(e, "card_type")}
        />
      </label>
      <br />
      <label>
        Card Number:{" "}
        <input
          type="text"
          placeholder={card.card_number}
          value={card.card_number}
          onChange={(e) => handleFieldChange(e, "card_number")}
        />
      </label>
      <br />
      <label>
        CVV:{" "}
        <input
          type="text"
          placeholder="***"
          value={card.cvv || " "}
          onChange={(e) => handleFieldChange(e, "cvv")}
        />
      </label>
      <br />
      <label>
        Expiration Date:{" "}
        <input
          type="text"
          placeholder={card.expiration}
          value={card.expiration}
          onChange={(e) => handleFieldChange(e, "expiration")}
        />
      </label>
      <br />
      <label>
        Billing Address Line One:{" "}
        <input
          type="text"
          placeholder={card.billing_address_one}
          value={card.billing_address_one}
          onChange={(e) => handleFieldChange(e, "billing_address_one")}
        />
      </label>
      <br />
      <label>
        Line two:{" "}
        <input
          type="text"
          placeholder={card.billing_address_two}
          value={card.billing_address_two}
          onChange={(e) => handleFieldChange(e, "billing_address_two")}
        />
      </label>
      <br />
      <label>
        City:{" "}
        <input
          type="text"
          placeholder={card.billing_city}
          value={card.billing_city}
          onChange={(e) => handleFieldChange(e, "billing_city")}
        />
      </label>
      <br />
      <label>
        State:{" "}
        <input
          type="text"
          placeholder={card.billing_state}
          value={card.billing_state}
          onChange={(e) => handleFieldChange(e, "billing_state")}
        />
      </label>
      <br />
      <label>
        Zip Code:{" "}
        <input
          type="text"
          placeholder={card.billing_zip}
          value={card.billing_zip}
          onChange={(e) => handleFieldChange(e, "billing_zip")}
        />
      </label>
      <br />
      <br />
    </div>
  );
}

export default PaymentCard;
