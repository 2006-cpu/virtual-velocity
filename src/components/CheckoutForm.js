import React from "react";
import {
  useStripe,
  useElements,
  CardElement,
  Elements,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
// import CardSection from "./CardSection";
// import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { render } from "react-dom";

import "./CardSection.css";

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/account/apikeys
// const stripe = require("stripe")("pk_test_TYooMQauvdEDq54NiTphI7jx");

// Token is created using Stripe Checkout or Elements!
// Get the payment token ID submitted by the form:
// const token = request.body.stripeToken; // Using Express

class CheckoutForm extends React.Component {
  handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    const { stripe, elements } = this.props;

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      useHistory("./products");
    }
  };

  render() {
    const { stripe } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <CardElement
          options={{
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
          }}
        />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    );
  }
}

const InjectedCheckoutForm = () => {
  return (
    <ElementsConsumer>
      {({ elements, stripe }) => (
        <CheckoutForm elements={elements} stripe={stripe} />
      )}
    </ElementsConsumer>
  );
};

export default InjectedCheckoutForm;

// async function stripeTokenHandler(token) {
//   try {
//     const paymentData = { token: token.id };

//     // Use fetch to send the token ID and any other payment data to your server.
//     // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
//     const response = await fetch("/api/stripe", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(paymentData),
//     });

//     // Return and display the result of the charge.
//     return response.json();
//   } catch (error) {
//     console.error(error);
//   }
// }
