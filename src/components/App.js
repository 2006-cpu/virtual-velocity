import React, { useState, useEffect } from "react";

import { 
    getProducts 
} from "../api";

import { 
    Product, 
    SingleProduct, 
    Cart,
    NavBar
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
    const [user, setUser] = useState({});

  useEffect(() => {
    getProducts().then(setProducts);
      if (getLocalToken()) {
          setToken(getLocalToken());
      }
  }, []);

  return (
    <>
      <div className="App">
        <NavBar 
            token={token} 
            setToken={setToken}
            setUser={setUser}/>
        <Route exact path="/cart">
          < Cart />
        </Route>
        <Route exact path="/products">
          {products.map((product) => {
            return <Product key={product.id} product={product} />;
          })}
        </Route>
        <Route exact path="/products/:productId">
            <SingleProduct />
        </Route>
      </div>
    </>
  );
};

export default App;
