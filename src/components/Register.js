import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { InputGroup, Form, FormControl, Button, Alert } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { register, getUser } from "../api";
import "./index.css";

import { getLocalToken, setLocalToken } from "../util";

export default (props) => {
  const { setUser, token, setToken } = props;
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState();
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRegister = async (event) => {
    try {
      event.preventDefault();

      const response = await register({
        username,
        password,
        firstName,
        lastName,
        email,
      });
      const data = response;

      setMessage(data.message);

      if (data.token) {
        setUsername("");
        setPassword("");

        setToken(data.token);
        setLocalToken(data.token);
        setUser(data.user);
        handleClose();
      } else {
        console.error("user did not set");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="bodyWrapper">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Register / Create Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleRegister}>
              <Form.Group controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group controlId="formGridUsername">
                <Form.Label>username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group controlId="formFirstname">
                <Form.Label>firstName</Form.Label>
                <Form.Control
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group controlId="formLastname">
                <Form.Label>lastName</Form.Label>
                <Form.Control
                  type="text"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="1234 Main St" />
              </Form.Group>

              <Form.Group controlId="formGridAddress2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control placeholder="Apartment, studio, or floor" />
              </Form.Group>

              <Form.Row>
                <Form.Group controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control />
                </Form.Group>

                <Form.Group controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Control as="select" defaultValue="Choose...">
                    <option>California</option>
                    <option>California</option>
                    <option>Sorry yo, we only do Cali</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formGridZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control />
                </Form.Group>
              </Form.Row>

              <Form.Group id="formGridCheckbox">
                <Form.Check
                  type="checkbox"
                  label="By submitting you agree to our terms of service and privacy policy"
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <p className="btn-danger"> {message} </p>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};
