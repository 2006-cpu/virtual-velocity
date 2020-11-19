import React, { useState, useEffect } from "react";

import { getSomething } from "../api";
import NavBar from "./Navbar";

import {
  Product,
} from './';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

const App = () => {

  const [products, setProducts] = useState([]);

  return ( <>
    <div className="App">
      < NavBar />
      < Route path="/products/:productId" >
       < Product products={products} setProducts={setProducts} />
      </Route>

    </div>
    </>
  );
};

export default App;
