import axios from "axios";

import { getLocalToken } from "../util";

const BASE_URL = "/api";

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
    const { data } = await axios.post(`${BASE_URL}/users/login`, {
      username,
      password,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function register({
  username,
  password,
  firstName,
  lastName,
  email,
}) {
  try {
    const { data } = await axios.post(`${BASE_URL}/users/register`, {
      username,
      password,
      firstName,
      lastName,
      email,
    });
    // setMessage(data.message)
    console.log("data register from API", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getUser(token) {
  try {
    const { data } = await axios.get(`${BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("userData from API", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getOrdersByUserId(userId, token) {
  try {
    const { data } = await axios.get(`${BASE_URL}/users/${userId}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("orders in api orders", data);

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllOrders() {
  try {
    const { data } = await axios.get(`${BASE_URL}/orders`);
  } catch (error) {
    throw error;
  }
}

export async function addProductToOrder({
  orderId,
  productId,
  price,
  quantity,
}) {
  try {
    // /  post
    const { data } = await axios.post(`${BASE_URL}/orders/:orderId/products`, {
      orderId,
      productId,
      price,
      quantity,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function removeProductFromOrder(productId) {
  try {
    const data = axios.delete(`${BASE_URL}/order_products/${productId}`);
    // const data = axios.delete(`${BASE_URL}/order_products/:orderProductId`)
    console.log("remove prod in api", data);

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getCartByUser() {
  try {
    const data = axios.get(`${BASE_URL}/users/cart`);
    console.log("getcart in api", data);
  } catch (error) {
    throw error;
  }
}

export async function createOrder() {
  try {
    const data = axios.get(`${BASE_URL}/orders`);
    console.log("new order in api", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createProduct({
  name,
  description,
  price,
  imageURL,
  inStock,
  category,
  token,
}) {
  const bearer = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const body = {
    name,
    description,
    price,
    imageURL,
    inStock,
    category,
  };

  try {
    const { data } = await axios.post(`${BASE_URL}/products`, body, bearer);
    console.log("create new product data:", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateProduct(
  {
    newName,
    newDescription,
    newPrice,
    newImageURL,
    newInStock,
    newCategory,
    token,
  },
  id
) {
  const bearer = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const body = {
    name: newName,
    description: newDescription,
    price: newPrice,
    imageURL: newImageURL,
    inStock: newInStock,
    category: newCategory,
  };

  try {
    const { data } = await axios.patch(
      `${BASE_URL}/products/${id}`,
      body,
      bearer
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteProduct(id, token) {
  try {
    const data = await axios.delete(`${BASE_URL}/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("deleted product data", data);
    return data;
  } catch (error) {
    throw error;
  }
}

//  DELETE /order_products/:orderProductId (**)
//  Remove a product from a order, use hard delete

export const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${getLocalToken()}`,
  },
});
