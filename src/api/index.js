import axios from "axios";
import {getLocalToken} from '../util'

const BASE_URL = "/api"

export async function getProductById(id) {
    try {
    const { data } = await axios.get(`${BASE_URL}/products/${id}`);
    // console.log("data from index API getProducts", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getProducts() {
  try {
    const { data } = await axios.get(`${BASE_URL}/products`);
    // console.log("data from index API getProducts", data);
    return data;
  } catch (error) {
    throw error;
  }
}


export async function login(username, password) {
  try {
    const { data } = await axios.post(`${BASE_URL}/users/login`, {username, password});
    return data;
  } catch (error) {
    throw error;
  }
}

export async function register({username, password, firstName, lastName, email}) {
  try {
    const {data} = await axios.post(`${BASE_URL}/users/register`, {
    username,
    password,
    firstName,
    lastName,
    email,
    });
      // setMessage(data.message)

  console.log('data register from API', data);
  return data;

  } catch (error) {
    throw error
  }
}

export async function getUser(token) {
  try {
    const { data } = await axios.get(`${BASE_URL}/users/me`, {
      headers: {
      'Authorization': `Bearer ${token}`
    }})
    console.log("userData from API", data)
    return data;

  } catch (error) {
    throw error;
  }
}

export async function getOrdersByUserId(userId, token) {
    try {
        const { data } = await axios.get(`${BASE_URL}/users/${userId}/orders`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        console.log("orders in api orders", data)

        return data;
    } catch (error) {
        throw error;
    }
}

export async function getAllOrders(){
    try{
        const { data } = await axios.get(`${BASE_URL}/orders`);
    } catch (error) { throw error;
    }
}
