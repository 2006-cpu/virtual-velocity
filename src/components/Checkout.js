import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Account, SingleOrder, Cart } from "./";
import { 
    getOrdersByUserId,
    cancelOrder,
    completeOrder
} from "../api";

const Checkout = (props) => {
  const { user, setUser, token, setToken } = props;
  const [orders, setOrders] = useState();
  let history = useHistory();

  useEffect(() => {
    if (token && user && !orders) {
      getOrdersByUserId(user.id, token).then((data) => {
        setOrders(data);
      });
    }
  }, [orders, user, token]);

  return (
    <>
      <div className="Checkout">
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Your Order</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {orders && <SingleOrder user={user} orders={orders} />}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="success">Complete Order</Button>
            <Button variant="warning">Cancel Order</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </>
  );
};

export default Checkout;
