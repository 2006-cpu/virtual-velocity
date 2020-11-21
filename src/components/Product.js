import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./Product.css";
import { useParams } from "react-router-dom";

const Product = (props) => {
  const { product, products, setProducts } = props;
  const { productId } = useParams();

  return (
    <>
      {console.log("prod3", product.name, product.id)}
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={product.imageURL} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text>{product.price}</Card.Text>
          <Card.Text>{product.category}</Card.Text>
          <Card.Text>{product.inStock}</Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default Product;
