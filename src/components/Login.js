import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Button, Form, FormControl, Alert } from "react-bootstrap";

import { setLocalToken } from '../util'
import { Logout } from './';
import {
    fetchUser,
    login
} from '../api'

const BASE_URL = '/api'

export default props => {
    const { setUser, token, setToken } = props;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const loginResponse = await login(username, password);
            if (loginResponse.token) {
                setUsername('')
                setPassword('')
                setLocalToken(loginResponse.token)
                setToken(loginResponse.token);
                setUser(loginResponse.user);
            } else {
                setError(loginResponse.message)
            }
        } catch (error) {
            console.error(error);
        }
    }
  
    return <> 
      {(error) && <Alert>{error}</Alert>}  
      {(token) 
        ? <Logout setUser={setUser} setToken={setToken} />
        : <Form inline onSubmit={handleSubmit} >
            <FormControl type="text" value={username} onChange={(e) => {setUsername(e.target.value)}} />
            <FormControl type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
            <Button type="submit" >Login</Button> 
            <Button type="button" >Register</Button> 
          </Form>}
    </>
}
