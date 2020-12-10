import axios from "axios";

import { getLocalToken } from "../util";

const BASE_URL = "/api";

export async function getProductById(id) {
  try {
    const { data } = await axios.get(`${BASE_URL}/products/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getProducts() {
  try {
    const { data } = await axios.get(`${BASE_URL}/products`);
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

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllOrders() {
  try {
    const { data } = await axios.get(`${BASE_URL}/orders`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function addProductToOrder({
  orderId,
  productId,
  price,
  quantity,
}, token) {
  try {
      const { data } = await axios.post(`${BASE_URL}/orders/${orderId}/products`, {
          productId,
          price,
          quantity,
      }, 
          {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          }
      );

    return data;
  } catch (error) {
    throw error;
  }
}

export async function removeProductFromOrder(productId) {
  try {
    const data = axios.delete(`${BASE_URL}/order_products/${productId}`);

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getCartByUser(token) {
  try {
    const { data } = await axios.get(`${BASE_URL}/orders/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createOrder() {
  try {
    const data = axios.get(`${BASE_URL}/orders`);
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
  try {
    const { data } = await axios.post(
      `${BASE_URL}/products`,
      {
        name,
        description,
        price,
        inStock,
        imageURL,
        category,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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
    const { data } = await axios.delete(`${BASE_URL}/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function completeOrder(id, token){
    try {
        const { data } = await axios.patch(`${BASE_URL}/${id}/complete`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return data;

    } catch (error) {
        throw error;
    }
}

export async function cancelOrder(id, token){
    try {
        const { data } = await axios.delete(`${BASE_URL}/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

         return data;
    } catch (error) {
        throw error;
    }
};
