import React from "react";
import { SingleOrder } from "./";
import { useHistory } from "react-router-dom";
import "./index.css";
import {
    cancelOrder,
    completeOrder,
    createOrder
} from "../api"
import swal from "sweetalert";
const Cart = (props) => {
    const {token, user, setUser, cart, setCart} = props
    const history = useHistory();

    const handleCheckout = async () => {
        try {
            await completeOrder(cart.id, token); 
           // const newCart = await createOrder(token);
           // newCart.products = [];
           // setCart(newCart);
            setCart({...cart, products: []});
            swal({
                title: 'Confiming Order',
                text: 'You have successfully placed your order',
                icon: 'success',
            }).then((isClicked) => {
                if(isClicked) {
                    history.push('/');
                }
            });
        } catch (error) {
            throw error;
        }
    }

    const handleCancel = async () => {
        try {
            await cancelOrder(cart.id, token);
            //const newCart = await createOrder(token);
            //newCart.products = [];
            //setCart(newCart);
            setCart({...cart, products: []});
            swal({
                title: 'Cancelling Order',
                text: 'You have cancelled your order',
                icon: 'warning',
            }).then((isClicked) => {
                if(isClicked) {
                    history.push('/');
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    return ( 
        <div className="bodyWrapper">
            <h1> Shopping Cart </h1>
            <SingleOrder order={cart} isCart={true} token={token} setCart={setCart}/>
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
