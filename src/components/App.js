import React, { useState, useEffect } from "react";

import { 
    getProducts, 
    getUser, 
    getOrdersByUserId,
    getCartByUser,
} from "../api";

import {
  Products,
  SingleProduct,
  Cart,
  NavBar,
  Register,
  SingleOrder,
  Account,
  Home,
  Footer,
  Checkout,
  CheckoutForm
} from "./";

import {
  Route
} from "react-router-dom";

import { getLocalToken } from "../util";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(`${process.env.REACT_APP_PUBLISHABLE_KEY}`);

const App = () => {
    //upon a successful purchase, stripe form should disappear and reset state
    const [showStripe, setShowStripe] = useState(true);
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState("");
    const [user, setUser] = useState({});
    const [orders, setOrders] = useState([]);
    const [cart, setCart] = useState({});

    //this handles all of  initial axios calls that occur initial load
    const handleInitialLoad = async () => {
        try {
            const fetchProducts = await getProducts();
            setProducts(fetchProducts);
            if (getLocalToken()){
                setToken(getLocalToken());
                const userData = await getUser(getLocalToken());
                setUser(userData);
                if(userData.isAdmin){
                    // grab all orders
                } else {
                    // grab all current users orders including the cart
                    const fetchOrders = await getOrdersByUserId(userData.id, getLocalToken());  
                    setOrders(fetchOrders);
                    const fetchCart = await getCartByUser(getLocalToken());
                    setCart(fetchCart);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleSwitchUser = async () => {
        const fetchOrders = await getOrdersByUserId(user.id, token);  
        setOrders(fetchOrders);
        const fetchCart = await getCartByUser(token);
        setCart(fetchCart);
    }

    useEffect(() => {
        handleInitialLoad();
    }, []);

    useEffect(() => {
        if (token) {
        handleSwitchUser();
        }
    }, [token]);

  return (
      <div className="App">
        <NavBar setOrders={setOrders} setCart={setCart} token={token} setToken={setToken} setUser={setUser} />
        <Route exact path="/">
          <Home products={products} />
        </Route>
        <Route exact path="/cart">
          <Cart setCart={setCart} user={user} cart={cart} token={token} />
        </Route>
        <Route exact path="/register">
          <Register
            token={token}
            setToken={setToken}
            user={user}
            setUser={setUser}
          />
        </Route>
        <Route exact path="/cart/checkout">
          <Account user={user} token={token} isInCheckout />
          <Checkout user={user} token={token} />
        </Route>
        <Route exact path="/account">
          <Account user={user} token={token} />
        </Route>
        <Route exact path="/products">
          <Products setOrders={setOrders} token={token} user={user} products={products} setProducts={setProducts} user={user} cart={cart} setCart={setCart}/>
        </Route>
        <Route exact path="/products/:productId">
          <SingleProduct user={user}/>
        </Route>
        <Route exact path="/orders/:orderId">
          <SingleOrder
            user={user}
            orders={orders}
            setOrders={setOrders}
            products={products}
            token={token}
          />
        </Route>
        <Route exact path="/stripe">
          <Elements stripe={stripePromise}>
            {showStripe === true ? (
              <CheckoutForm
                showStripe={showStripe}
                setShowStripe={setShowStripe}
              />
            ) : null}
          </Elements>
        </Route>
        <Footer />
      </div>
  );
};

export default App;
