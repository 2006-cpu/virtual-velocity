import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {InputGroup, Form, FormControl, Button, Alert} from 'react-bootstrap';

import {fetchUser, getToken, setToken as setLocalToken} from '../util'


export default props => {
  const {setUser, setToken, token} = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();
    
  useEffect(() => {
    if (!token) {
      setToken(getToken())
    } 
  },[getToken]) 

  const handleRegister = async (event) => {
    try {
      event.preventDefault();
      
      const {data} = await axios.post(`${BASE_URL}/users/register`, {username, password});

  console.log('data', data);
        setUsername('')
        setPassword('')
        console.log('token: ', data.token);
        setToken(data.token);
        setLocalToken(data.token)
        const user = await fetchUser({url: '/users/me'});
        console.log('user', user);
        if(user && user.username) {
          localStorage.setItem('user', user)
          setUsername(user.username);
          setUser(user)
        } else if (data.error) {
          setError(<Alert variant="danger" >
            {data.error}
          </Alert>) 
        }
    } catch (error) {
      console.error(error);
    }
  }

  return <> 
    {error}  
    {token 
      ? <Logout setUser={setUser} setToken={setToken} />
      : <Form inline onSubmit={handleRegister}>
          <FormControl type="text" value={username} onChange={(e) => {setUsername(e.target.value)}} />
          <FormControl type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
          <Button type="submit" >Register</Button> 
        </Form>}
  </>
}
