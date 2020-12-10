import React from 'react';
import { Button } from 'react-bootstrap';
import { removeLocalToken } from '../util';

export default function Logout(props) {
  const { setUser, setToken, setOrders, setCart } = props;
  
    return (
        <Button 
        onClick={() => {
            setUser({});
            removeLocalToken();
            setToken('');
            setOrders([]);
            setCart({});
        }}>
            Log Out
        </Button>
    );
}
