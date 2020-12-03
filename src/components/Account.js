import React, { useEffect, useState } from "react";
import { Card, ListGroupItem, ListGroup, Button, Nav } from "react-bootstrap";
import { getOrdersByUserId } from '../api';
import { useParams } from "react-router-dom";
const Account = (props) => {
    const { user, setUser, token, setToken } = props;
    const [orders, setOrders] = useState();
    useEffect(() => {
        if (token && user && !orders) {
            getOrdersByUserId(user.id, token).then(data => {
                setOrders(data)
            });
        }
    }, [orders, user, token])
    return (
        <>
            {/* <Nav fill variant="tabs" defaultActiveKey="/home">
    <Nav.Item>
        <Nav.Link eventKey="link-1">Dashboard</Nav.Link>
    </Nav.Item>
    <Nav.Item>
        <Nav.Link eventKey="link-2">Account Details</Nav.Link>
    </Nav.Item>
    <Nav.Item>
        <Nav.Link eventKey="link-3">Address</Nav.Link>
    </Nav.Item>
    <Nav.Item>
        <Nav.Link eventKey="link-4">
        Orderss
        </Nav.Link>
    </Nav.Item>
</Nav> */}
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
                <Card.Body>
                    {user && <Card.Title>Hello {user.username} welcome to your account!</Card.Title>}
                    <Card.Text>
                        From your account dashboard you can view your recent orderss, manage your shopping and billing address and edit your account details.
        </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    {user && <>
                        <ListGroupItem>{user.lastName}</ListGroupItem>
                        <ListGroupItem>{user.firstName}</ListGroupItem>
                        <ListGroupItem>{user.lastName}</ListGroupItem>
                        <ListGroupItem>{user.email}</ListGroupItem>
                    </>}
                </ListGroup>
            </Card>
            {orders && orders.map((order) => {
                return (
                    <Card style={{ width: '18rem' }}>
                        <Card.Header>Featured</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>{order.id}</ListGroup.Item>
                            <ListGroup.Item>{order.status}</ListGroup.Item>
                            <ListGroup.Item>{order.datePlaced}</ListGroup.Item>
                        </ListGroup>
                    </Card>
                )
            })}
        </>
    );
};
export default Account;