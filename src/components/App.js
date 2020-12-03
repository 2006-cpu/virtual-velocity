import React, { useState, useEffect } from "react";
import {
  getProducts,
  getUser,
  getOrdersByUserId
} from "../api";
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
import {
  getLocalToken
} from "../util";
const App = () => {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');
  const [user, setUser] = useState();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getProducts().then(setProducts);
    const localToken = getLocalToken();
    if (localToken) {
      setToken(localToken);
      getUser(localToken).then(data => setUser(data));
    }
  }, []);

    useEffect(() => {
        getUser(token).then(setUser);
        getOrdersByUserId(user?.id, token).then(setOrders);
    }, [token]);

    console.log('orders in main app', orders)
    console.log('products in main app', products)

  return (
    <>
      <div className="App">
        <NavBar
            token={token}
            setToken={setToken}
            setUser={setUser}/>
        <Route exact path="/">
          < Home products={products} />
        </Route>
        <Route exact path="/cart">
          < Cart user={user} />
        </Route>
        <Route exact path="/register">
          <Register token={token} setToken={setToken} user={user} setUser={setUser} />
        </Route>
        <Route exact path="/account">
          <Account user={user} token={token} />
        </Route>
        <Route exact path="/products">
          < Product products={products} setProducts={setProducts} user={user} orders={orders} setOrders={setOrders} />
        </Route>
        <Route exact path="/products/:productId">
          <SingleProduct />
        </Route>
        <Route exact path="/orders/:orderId">
            <SingleOrder user={user} orders={orders} setOrders={setOrders} products={products} token={token}/>
        </Route>
        < Footer />
      </div>
    </>
  );
};
export default App;
