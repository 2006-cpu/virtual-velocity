import React, { useState, useEffect } from "react";
import { getProducts, getUser, getOrdersByUserId } from "../api";
import {
  Product,
  SingleProduct,
  Cart,
  NavBar,
  Register,
  SingleOrder,
  Account,
  Home,
  Footer,
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

const stripePromise = loadStripe(
  "pk_test_51Ht3KIDb1cCPXKe0pegkjh96D6Wf83gqHU1T6RaalLEfch8L4XcJnUismKd2bctYGkVLbb5rkG7a1jYvNz7Wh0eG00v9V1t8T9"
);

// secret key = sk_test_51Ht3KIDb1cCPXKe0gynICwL36yklzfwCh1pynYEjOvyxSh4pXzWSob4gm84g6DgEDCaHefsgNL9gQqp5PNPAmQjg00jOeKHYYY

//publishable key = pk_test_51Ht3KIDb1cCPXKe0pegkjh96D6Wf83gqHU1T6RaalLEfch8L4XcJnUismKd2bctYGkVLbb5rkG7a1jYvNz7Wh0eG00v9V1t8T9

const App = () => {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getProducts().then(setProducts);
    const localToken = getLocalToken();
    if (localToken) {
      setToken(localToken);
      getUser(localToken).then((data) => setUser(data));
    }
  }, []);

  useEffect(() => {
    getUser(token).then(setUser);
    // getOrdersByUserId(user.id, token).then(setOrders);
  }, [token]);

  console.log("orders in main app", orders);

  return (
    <>
      <div className="App">
        <NavBar token={token} setToken={setToken} setUser={setUser} />
        <Route exact path="/">
          < Home products={products} />
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
        <Route exact path="/account">
          <Account user={user} token={token} />
        </Route>
        <Route exact path="/products">
          < Product products={products} setProducts={setProducts} user={user} />
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
            <CheckoutForm />
          </Elements>
        </Route>
        <Footer />
      </div>
    </>
  );
};
export default App;
