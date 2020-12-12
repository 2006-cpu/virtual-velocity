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
const stripePromise = loadStripe('pk_test_51Ht3KIDb1cCPXKe0pegkjh96D6Wf83gqHU1T6RaalLEfch8L4XcJnUismKd2bctYGkVLbb5rkG7a1jYvNz7Wh0eG00v9V1t8T9');


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
                    <button role="link">
      Sams stripe Checkout
    </button>
        </div>
        )
}

export default Cart;
