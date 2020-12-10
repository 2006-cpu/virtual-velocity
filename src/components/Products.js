import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./index.css";

import { BrowserRouter as Router, useParams } from "react-router-dom";

import { createProduct, deleteProduct } from "../api";

import { SingleProduct } from "./";

const Products = (props) => {
  const { token, products, setProducts, cart, setCart, user } = props;

  const { productId } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = await createProduct({
        name,
        description,
        price,
        inStock,
        imageURL,
        category,
      });
      if (data) {
        setName("");
        setDescription("");
        setPrice("");
        setInStock(true);
        setImageURL("");
        setCategory("");
        const newProducts = [...products, data];
        setProducts(newProducts);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleProductsDelete = async (id) => {
    try {
      const data = await deleteProduct(id, token);
      if (data) {
        // const newProducts;
        console.log("products:", products);
        // console.log("newProducts:", newProducts);
        setProducts(products.filter((product) => data.id !== product.id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {user.isAdmin && (
        <Form.Group
          style={{ marginTop: "5rem", marginLeft: "35%", marginRight: "35%" }}
        >
          <h4 style={{ paddingLeft: "1rem" }}>Product Name</h4>
          <Form.Control
            value={name}
            type="text"
            placeholder=""
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <br />
          <h4 style={{ paddingLeft: "1rem" }}>Description</h4>
          <Form.Control
            value={description}
            type="text"
            placeholder=""
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />

          <h4 style={{ paddingLeft: "1rem" }}>Price</h4>
          <Form.Control
            value={price}
            type="integer"
            placeholder=""
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />

          <h4 style={{ paddingLeft: "1rem" }}>Image URL</h4>
          <Form.Control
            value={imageURL}
            type="text"
            placeholder=""
            onChange={(event) => {
              setImageURL(event.target.value);
            }}
          />

          <h4 style={{ paddingLeft: "1rem" }}>Category</h4>
          <Form.Control
            value={category}
            type="text"
            placeholder=""
            onChange={(event) => {
              setCategory(event.target.value);
            }}
          />

          <Form.Check
            type="checkbox"
            style={{ marginLeft: "1rem", marginTop: "1rem" }}
            onChange={(event) => {
              if (event.target.value === "on") {
                setInStock(true);
              } else {
                setInStock(event.target.value);
              }
            }}
            label="In Stock? "
          />
          <Button
            type="submit"
            onClick={handleSubmit}
            style={{ marginLeft: "1rem", marginTop: "1rem" }}
            variant="success"
          >
            Create Product
          </Button>
        </Form.Group>
      )}
      <div
        style={{ justifyContent: "space-evenly" }}
        className="bodyWrapper flexWrapper"
      >
        {products &&
          products.map((product) => {
            return (
                <React.Fragment key={product.id}>
                    <SingleProduct 
                        token={token}
                        handleProductsDelete={handleProductsDelete}
                        products={products} 
                        setProducts={setProducts} 
                        product={product} 
                        cart={cart} 
                        setCart={setCart} 
                        user={user}/>
                </ React.Fragment>
            );
          })}
      </div>
    </>
  );
};

export default Products;
