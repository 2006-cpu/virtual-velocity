import React, { useEffect, useState } from "react";
import { SingleOrder } from "./"
// import { useParams } from "react-router-dom";



const Cart = (props) => {
  const {user, setUser} = props
  console.log('user in cart', user)

  const handleCheckout = () => {
    try {

      console.log('link to stripe or authorization HERE')

    } catch (error) {
      throw error
    }
  }


  return ( <>
  <h1> Shopping Cart </h1>
    {/* <h5> Welcome {user.firstName} {user.lastName}</h5> */}
    <p> Ready to checkout? With our stripe integration you can checkout feeling secure.</p>

      < SingleOrder />

    <div className="mb-3">
        <div className="pt-4">

          {/* <h5 className="mb-3">Cart total:</h5>

          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
              Products total
              <span>$50 (order_products total price) </span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center px-0">
              Shipping
              <span>$20 (do maybe order_products.length and add $5 for number of products)</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
              <div>
                <strong>Cart Total Amount</strong>
              </div>
              <span><strong>$100 (order_products total price)</strong></span>
            </li>
          </ul> */}

          <button type="button" className="btn btn-primary btn-block" onClick={ (event) => {
             event.preventDefault()
             handleCheckout()

          } }>Check Out</button>

        </div>
      </div>


  </>)

}

export default Cart
