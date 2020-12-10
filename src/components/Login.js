import React, { useState } from "react";
import { Button, Form, FormControl, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { setLocalToken } from "../util";
import { Logout } from "./";
import { login } from "../api";

export default (props) => {
  const { setUser, token, setToken, setCart, setOrders } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginResponse = await login(username, password);
      if (loginResponse.token) {
        setUsername("");
        setPassword("");
        setLocalToken(loginResponse.token);
        setToken(loginResponse.token);
        setUser(loginResponse.user);
        history.push("/"); //redirects after login
      } else {
        setError(loginResponse.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {error && <Alert>{error}</Alert>}
      {token ? (
        <Logout setCart={setCart} setOrders={setOrders} setUser={setUser} setToken={setToken} />
      ) : (
        <Form inline onSubmit={handleSubmit}>
          <FormControl
            style={{ marginRight: "10px" }}
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <FormControl
            style={{ marginRight: "10px" }}
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button type="submit">Login</Button>
        </Form>
      )}
    </>
  );
};
