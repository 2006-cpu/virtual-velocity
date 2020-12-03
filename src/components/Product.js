import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./Product.css";
import { useParams } from "react-router-dom";
import {getProducts} from '../api'

const Product = (props) => {
  const { product, products, setProducts, user } = props;
  const { productId } = useParams();

  return (
    <>
      { products && products.map(({category, description, id, imageURL, inStock, name, price}) => <>

            <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={imageURL} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Card.Text>{price}</Card.Text>
          <Card.Text>{category}</Card.Text>
          <Card.Text>{inStock}</Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>

      </>
      )}

    </>
  );
};

export default Product;
