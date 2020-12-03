import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOrdersByUserId } from '../api';
import './SingleOrder.css'

const SingleOrder = (props) => {
    const { orderId, } = useParams();
    const { user, orders, setOrders, token } = props;
     const [order, setOrder] = useState({})

    // console.log('user', user)
    // console.log('userId!', user.id)
    // console.log('token', token)

    // console.log("order in single order2", order)
    // console.log("order id", orderId)

    // console.log("ORDERS in Single Order", orders)

    // function getSum(total, num) {
    //     return total + num
    // }
    // let totalSum = price.reduce(getSum);
    // console.log('totalsum', totalSum)



    return ( <>
        <div className="single-order">
            <div className="products">
            <h1>My Order: </h1>
                { orders && orders.map(({products, id, userId, datePlaced, status}) =>
                 <div key={id} className="orders">
                    {console.log('12345', orders.userId)}
                    {console.log('products in orders map', products)}
                    {/* {console.log('priceOrders', price)} */}
                    <header className="order-info">
                        <div> Order #{id} </div>
                        <div> Order Status: {status} </div>
                        <div> Order Placed: {datePlaced} </div>
                    </header>

                        { products && products.map(({id, name, description, category, price, quantity}) => user && user.id === userId && <>
                        {console.log('map data 23', id, name, description, category, price, quantity)}
                        {/* {console.log('priceOrders', products.price)} */}


                        <h3>Product: {name}</h3>
                            <div key={id} className="product">
                                <div>Name: {name}</div>
                                <div>Category: {category}</div>
                                <div>Description: {description}</div>
                                <div>Quantity: {quantity}</div>
                                <div>Price: {price/100.0}</div>
                            </div>
                            <div>


                    </div>
                            </>

                    )
                }


                </div>
                )

                }
            </div>
            <footer>
                <div className="total">
                TEMP Total: $349.95

                </div>
            </footer>
        </div>
        </>
    );
}

export default SingleOrder;
