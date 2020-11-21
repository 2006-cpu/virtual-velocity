import axios from "axios";
const BASE = "/api";

export async function getSomething() {
  try {
    const { data } = await axios.get("/api");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getProduct(id) {
  try {
    const { data } = await axios.get(`${BASE}/products/${id}`);
    console.log("data from index API getProducts", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getProducts() {
  try {
    const { data } = await axios.get(`${BASE}/products`);
    console.log("data from index API getProducts", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getOrdersCart() {
  // SAM Note. add USER info
  // using the single order component with the current user's in-progress order. Use the api call GET /orders/cart) when the url matches /cart (*)
  try {
    const { data } = await axios.get(`${BASE}/orders/cart`);
    console.log("data from index API getOrdersCart", data);
    return data;
  } catch (error) {
    throw error;
  }
}

