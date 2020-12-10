import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOrdersByUserId } from "../api";
import "./SingleOrder.css";

const SingleOrder = (props) => {
  const { order } = props;
  const { orderId } = useParams();

    return (
        order &&
        <div className="single-order">
            <header className="order-info">
            <div> Order #{order.id} </div>
            <div> Order Status: {order.status} </div>
            <div> Order Placed: {order.datePlaced} </div>
            </header>
            <div className="products">
            Items inside cart:
            {order.products && order.products.map(({ id, name, description, category, price, quantity }) => { 
               return(
                   <div key={id} className="product">
                   <div>Name: {name} </div>
                   <div> Category: {category} </div>
                   <div> Description: {description} </div>
                   <div> Price: {price / 100.0} </div>
                   <div> Quantity: {quantity} </div>
                   </div>
               );
            }
            )
            }
            <div>Total: ${order?.products?.reduce((acc, {price, quantity})=> acc + ( (price/100.0) * quantity), 0).toFixed(2)} </div>
            </div>
        </div>
    );
}

export default SingleOrder;
