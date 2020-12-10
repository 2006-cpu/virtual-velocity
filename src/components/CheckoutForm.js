import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CardSection from "./CardSection";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/account/apikeys
// const stripe = require("stripe")("pk_test_TYooMQauvdEDq54NiTphI7jx");

// Token is created using Stripe Checkout or Elements!
// Get the payment token ID submitted by the form:
// const token = request.body.stripeToken; // Using Express

const CheckoutForm = ({ showStripe, setShowStripe }) => {
  const stripe = useStripe();
  const elements = useElements();
  let history = useHistory();

  async function stripeTokenHandler(token) {
    try {
      const paymentData = { token: token.id };

      // Use fetch to send the token ID and any other payment data to your server.
      // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
      const response = await fetch("/api/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      // Return and display the result of the charge.
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);

    if (result.error) {
      // Show error to your customer.
      console.log(result.error.message);
    } else {
      // Send the token to your server.
      // This function does not exist yet; we will define it in the next step.
      setShowStripe(false);
      stripeTokenHandler(result.token);
      history.push("/products");
    }
  };

  return (
    <form
      style={{
        marginTop: "7vw",
        marginLeft: "35%",
        marginRight: "30%",
      }}
      onSubmit={handleSubmit}
    >
      <CardSection />
      <Button
        type="submit"
        style={{ marginLeft: "67%" }}
        disabled={!stripe}
        variant="primary"
      >
        Buy Now
      </Button>{" "}
    </form>
  );
};

export default CheckoutForm;
