import React from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { CardElement } from "@stripe/react-stripe-js";
import "./CardSection.css";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

function CardSection() {
  return (
    <div>
      <label>
        <div style={{ marginLeft: "2vw", marginRight: "2vw" }}>
          Card details
        </div>
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </label>
    </div>
  );
}

export default CardSection;
