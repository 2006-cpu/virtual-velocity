import React, { useState, useEffect } from "react";
import { getProducts, getUser, getOrdersByUserId, getCartByUser } from "../api";
import {
  Product,
  SingleProduct,
  Cart,
  NavBar,
  Register,
  SingleOrder,
  Account,
  UserInfo,
  Home,
  Footer,
  // Checkout,
} from "./";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { getLocalToken } from "../util";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import Checkout from "./Checkout";

const stripePromise = loadStripe(`${process.env.REACT_APP_PUBLISHABLE_KEY}`);

const App = () => {
  //upon a successful purchase, stripe form should disappear and reset state
  const [showStripe, setShowStripe] = useState(true);
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);

  const handleInitialLoad = async () => {
    try {
      const fetchProducts = await getProducts();
      setProducts(fetchProducts);
      if (getLocalToken()) {
        setToken(getLocalToken());
        const userData = await getUser(getLocalToken());
        setUser(userData);
        if (userData.isAdmin) {
          // grab all orders
        } else {
          // grab all current users orders including the cart
          const fetchOrders = await getOrdersByUserId(
            userData.id,
            getLocalToken()
          );
          setOrders(fetchOrders);
          const fetchCart = await getCartByUser(getLocalToken());
          setCart(fetchCart);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleInitialLoad();
  }, []);

  console.log("orders in main app", orders);

  return (
    <>
      <div className="App">
        <NavBar token={token} setToken={setToken} setUser={setUser} />
        <Route exact path="/">
          <Home products={products} />
        </Route>
        <Route exact path="/cart">
          <Cart user={user} />
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
          <Product
            token={token}
            products={products}
            setProducts={setProducts}
            user={user}
            orders={orders}
            setOrders={setOrders}
          />
        </Route>
        <Route exact path="/products/:productId">
          <SingleProduct />
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
    </>
  );
};
export default App;
