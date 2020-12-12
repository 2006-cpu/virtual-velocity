import React from "react";
import { SingleOrder } from "./";
import "./index.css";
import {
    cancelOrder,
    completeOrder
} from "../api"
import { loadStripe } from '@stripe/stripe-js';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(`${process.env.REACT_APP_PUBLISHABLE_KEY}`);



const Cart = (props) => {
    const {token, user, setUser, cart, setCart} = props
    console.log('cart state in Cart component', cart);

    const handleCheckout = async () => {
        try {
            setCart({});
            await completeOrder(cart.id, token);
            //cart to be completed in api
            alert("You've checked out congrats!")
        } catch (error) {
            throw error;
        }
    }

    const handleCancel = async () => {
        try {
            //cart to be cancelled in api
            setCart({});
            await cancelOrder(cart.id, token);
            alert("You've cancelled your order boooo :(");
        } catch (error) {
            console.error(error);
        }
    }

    const handleClick = async (event) => {
        // Get Stripe.js instance
        const stripe = await stripePromise;

        // Call your backend to create the Checkout Session
        const response = await fetch('/create-checkout-session', { method: 'POST' });

        const session = await response.json();

        // When the customer clicks on the button, redirect them to Checkout.
        const result = await stripe.redirectToCheckout({
          sessionId: cart.id,
        });

        if (result.error) {
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer
          // using `result.error.message`.
        }
      };




    return (
        <div className="bodyWrapper">
            <h1> Shopping Cart </h1>
            < SingleOrder order={cart} />
            <button type="button" className="btn btn-primary btn-block" onClick={() => {
                handleCheckout();
            }}>Confirm and Checkout</button>
            <button className="btn btn-danger btn-block" onClick={() => {
                handleCancel();
            }}>Cancel Order</button>





      {/* <button role="link" onClick={handleClick}>
      Stripe Test Checkout
    </button> */}


        </div>
        )
}

export default Cart;
