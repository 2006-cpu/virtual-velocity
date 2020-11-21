import axios from "axios";

import {getLocalToken} from '../util'

const BASE_URL = "/api"

export async function getProduct(id) {
  try {
    const { data } = await axios.get(`${BASE_URL}/products/${id}`);
    console.log("data from index API getProducts", data);
    return data;
  } catch (error) {
    throw error;
  }
} 

export async function getProducts() {
  try {
    const { data } = await axios.get(`${BASE_URL}/products`);
    console.log("data from index API getProducts", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function login(username, password) {
  try {
    const { data } = await axios.post(`${BASE_URL}/users/login`, {username, password});
    console.log('dataLogin', data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function register(username, password) {
  try {
    const { data } = await axios.post(`${BASE_URL}/users/register`, {username, password});
    return data;
  } catch (error) {
    throw error;
  }
}
