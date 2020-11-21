import React, { useEffect, useState } from "react";
import { Button, Nav, Navbar, Form, FormControl } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";

import { Login } from './';

const NavBar = (props) => {
    const { setUser, token, setToken } = props;

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Virtual Velocity</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/products">Products</Nav.Link>
        <Nav.Link href="/cart">Cart</Nav.Link>
        <Nav.Link href="">Login</Nav.Link>
        <Nav.Link href="">Register</Nav.Link>
        <Nav.Link href="">Logout</Nav.Link>
      </Nav>
      <Login 
        setUser={setUser}
        token={token}
        setToken={setToken}/>
    </Navbar>
  );
};

export default NavBar;
