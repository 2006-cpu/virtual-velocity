import React from 'react'
import './Home.css'
import {
  Link,
} from 'react-router-dom'

// import { Product } from "./"

const Home = (props) => {
  return <div>
    <div className="hero-image">
  <div className="hero-text">
    <h1>Welcome to Virtual Traders</h1>
    <p>Buy Trading Cards Online</p>
    <Link className="btn btn-primary" to="/products">Start Trading</Link>
  </div>

</div>
<div id="homeContent">
<h2>Find hundreds of the most rare trading cards available</h2>
<p>Virtual Traders specializes in the hard to find, extra special, trading cards and collectables.</p>

    <p>Simply search our database of cards</p>
    <p>Select the card you want</p>
    <p>Add the card to your cart</p>
    <p>And checkout secured with Stripe</p>

{/* <Product /> */}
<h2>PRODUCTS COMPONENT HERE</h2>
</div>

</div>
}

export default Home;