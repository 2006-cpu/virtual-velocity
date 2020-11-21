import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { getProduct } from "../api";

const SingleProduct = () => {
    const [product, setProduct] = useState({});
    const { productId } = useParams();

    useEffect(() => {
        getProduct(productId).then(setProduct);
    }, [])

    return (
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
    );
}

export default SingleProduct;
