import React from "react";
import { SingleOrder } from "./";
import "./index.css";
import {
    cancelOrder,
    completeOrder
} from "../api"
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
        </div>
        )
}

export default Cart;
