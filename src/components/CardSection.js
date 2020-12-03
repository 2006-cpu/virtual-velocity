import React from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { CardElement } from "@stripe/react-stripe-js";
import "./CardSection.css";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

function CardSection() {
  return (
    <div>
      <label>
        <div style={{ marginLeft: "13vw", marginRight: "2vw" }}>
          Card details
        </div>
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </label>
    </div>
  );
}

export default CardSection;
