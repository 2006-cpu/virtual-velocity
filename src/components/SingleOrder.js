import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap"
import { 
    getOrdersByUserId,
    removeProductFromOrder,
} from "../api";
import "./SingleOrder.css";

const SingleOrder = (props) => {
  const { order, isCart, setCart, token } = props;
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
            {order.products && order.products.map(({ imageURL, id, name, description, category, price, quantity }) => { 
                let product = { imageURL, id, name, description, category, price, quantity };
               return(
                   <div style={{height: "10rem", width:"80rem", margin: "3rem", justifyContent: "space-between"}} key={id} className="product">
                   <img style={{height: "100%"}} src={imageURL} />
                   <div style={{alignSelf: "center", maxWidth: "15rem", minWidth: "15rem"}}> {name} </div>
                   <div style={{alignSelf: "center", maxWidth: "10rem", minWidth: "10rem"}}> ${price / 100.0} </div>
                   {isCart 
                       ? <div style={{alignSelf: "center"}} >
                       <input style={{width: "3rem"}} type="number" value={quantity} onChange={(e)=> {
                           const newProducts = [...order.products];
                           for(let i = 0; i < newProducts.length; i++){
                               if(newProducts[i].id === id){
                                   newProducts[i].quantity = e.target.value;
                               }
                           }
                           const newCart = {...order, products: newProducts};
                       }} /> 
                        <Button className="btn btn-danger" onClick={async () => {
                       await removeProductFromOrder(order.id, product.id, token);
                       const newProducts = order.products.filter(({id}) => id !== product.id);
                       const newCart = {...order, products: newProducts}
                       setCart(newCart); 
                   }}>Remove</Button>
                       </div>
                       : <div> Quantity: {quantity} </div>}
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
