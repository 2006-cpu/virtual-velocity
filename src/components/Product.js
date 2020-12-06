import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./Product.css";
import "./index.css";
import {
  addProductToOrder,
  removeProductFromOrder,
  getCartByUser,
  createOrder,
} from "../api";
import {
  BrowserRouter as Router,
  useParams,
  Link,
  Route,
} from "react-router-dom";
import { getProducts } from "../api";

const Product = (props) => {
  const { product, products, orders, setOrders, setProducts, user } = props;
  const { productId } = useParams();
  console.log("orders", orders);
  console.log("order id", orders.id);
  console.log("user", user);
  console.log("products all1", products);
  // console.log('products all id', products.id)

  const handleAddToOrder = async ({ id, price, quantity }) => {
    // console.log('add to order clicked')
    const currentOrder = await getCartByUser();
    console.log("existingOrder", currentOrder);
    const productId = id;
    //     For each product NOT in cart
    //  Create add-to-cart button
    //  Up to you if you want this to increment previously-existing product quantity.
    console.log("222", productId, price, quantity);

    // const product = products.map((product) => {
    //   // console.log('products all', product)
    //   return product
    // })
    // console.log('products all3', product)

    // const ordersProducts = orders.map(({products, id, userId, datePlaced, status}) => {
    //   return products

    // })

    // const orderProductId = ordersProducts.map(({id, name}) => {
    //   console.log('55555', ordersProducts)
    //   return id
    // })

    try {
      if (currentOrder) {
        console.log("add to order clicked");
        const { data } = await addProductToOrder({
          // orderId,
          productId,
          price,
          quantity,
        });
        console.log("data in prouduct comp add to order", data);

        // create order
        //add product to the order
      } else {
        console.log("!!!!!");
        // create order
        const newOrder = await createOrder();
        console.log("data in prouduct comp add to order", newOrder);
        //add product to the order
        const { data } = await addProductToOrder({
          // orderId,
          productId,
          price,
          quantity,
        });
        console.log("data in prouduct comp add to order", data);
      }
    } catch (error) {
      throw error;
    }
  };

  const handleRemoveFromOrder = async (productId) => {
    try {
      console.log("remove order clicked");

      const data = await removeProductFromOrder(productId);
      console.log("remove prod in product comp", data);
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <div className="bodyWrapper flexWrapper">
        {products &&
          products.map(
            ({
              category,
              description,
              id,
              imageURL,
              quantity,
              inStock,
              name,
              price,
            }) => (
              <>
                <Card
                  style={{
                    width: "18.1rem",
                    marginTop: "5vh",
                    marginBottom: "5vh",
                    border: "2px solid black",
                  }}
                >
                  <Card.Img
                    style={{ height: "65vh", width: "46.5vh" }}
                    variant="top"
                    src={imageURL}
                  />
                  <Card.Body>
                    <Card.Title>Name: {name}</Card.Title>
                    <Card.Text>Description: {description}</Card.Text>
                    <Card.Text>Price: {price}</Card.Text>
                    <Card.Text>Category: {category}</Card.Text>
                    <Card.Text>{inStock}</Card.Text>
                    <Link className="btn btn-primary " to={`/products/${id}`}>
                      View Product
                    </Link>

                    <Button
                      style={{
                        justifyContent: "space-around",
                        marginLeft: "2vh",
                        marginRight: "1vh",
                      }}
                      className="btn btn-primary"
                      onClick={(event) => {
                        event.preventDefault();
                        handleAddToOrder({ id, price, quantity });
                      }}
                    >
                      {" "}
                      +{" "}
                    </Button>
                    <Button
                      className="btn btn-danger"
                      onClick={(event) => {
                        event.preventDefault();
                        // if not in cart
                        // if order.product.id !== product.id
                        //display button
                        handleRemoveFromOrder(id);
                      }}
                    >
                      {" "}
                      -{" "}
                    </Button>
                  </Card.Body>
                </Card>
              </>
            )
          )}
      </div>
    </>
  );
};

const testFunc = () => {};

export default Product;
