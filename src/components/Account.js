import React, { useEffect, useState } from "react";
import { Card, ListGroupItem, ListGroup, Button, Nav } from "react-bootstrap";
import { getOrdersByUserId } from "../api";
import { useParams } from "react-router-dom";
import "./Account.css";
import "./index.css";

const Account = (props) => {
  const { user, token, isInCheckout = false } = props;
  const [orders, setOrders] = useState();
  useEffect(() => {
    if (token && user && !orders) {
      getOrdersByUserId(user.id, token).then((data) => {
        setOrders(data);
      });
    }
  }, [orders, user, token]);
  return (
    <>
      <div className="bodyWrapper">
        <div className="dash-board">
          <Card style={{ width: "18rem" }}>
            {!isInCheckout && (
              <Card.Body>
                {user && (
                  <Card.Title>
                    Hello {user.username} welcome to your account!
                  </Card.Title>
                )}
                <Card.Text>
                  From your account dashboard you can view your recent orderss,
                  manage your shopping and billing address and edit your account
                  details.
                </Card.Text>
              </Card.Body>
            )}
            <ListGroup className="list-group-flush">
              {user && (
                <>
                  <ListGroupItem>{user.lastName}</ListGroupItem>
                  <ListGroupItem>{user.firstName}</ListGroupItem>
                  <ListGroupItem>{user.email}</ListGroupItem>
                </>
              )}
            </ListGroup>
          </Card>
          {!isInCheckout &&
            orders &&
            orders.map((order) => {
              return (
                <Card
                  id="orderStyle"
                  style={{ width: "18rem", marginTop: "2rem" }}
                >
                  <Card.Header>Order</Card.Header>
                  <ListGroup variant="flush">
                    <ListGroup.Item>{order.id}</ListGroup.Item>
                    <ListGroup.Item>{order.status}</ListGroup.Item>
                    <ListGroup.Item>{order.datePlaced}</ListGroup.Item>
                  </ListGroup>
                </Card>
              );
            })}
        </div>
      </div>
    </>
  );
};
export default Account;
