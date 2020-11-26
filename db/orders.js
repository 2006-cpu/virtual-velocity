const { client } = require("./index");

const getOrderById = async (id) => {
  // return the order, include the order's products

  try {
    const { rows: order } = await client.query(
      `
      SELECT orders.*, order_products.*, products.*
      FROM orders
      JOIN order_products
      ON orders.id = order_products."orderId"
      JOIN products
      ON products.id = order_products."productId"
      WHERE orders.id = $1;
    `,
      [id]
    );
    return order;
  } catch (error) {
    throw error;
  }
};

const getAllOrders = async () => {
  //  select and return an array of orders, include their products

  try {
    const {
      rows: [orders],
    } = await client.query(`
    SELECT orders.*, products.*
    from orders
    JOIN order_products
    ON orders.id = order_products."orderId"
    JOIN products
    ON order_products."productId" = products.id;
    `);
    return orders;
  } catch (error) {
    throw error;
  }
};

//server errors out at username
const getOrdersByUser = async ({ username }) => {
  //  select and return an array of orders made by user, include their products
  try {
    const {
      rows: [orders],
    } = await client.query(
      `
    SELECT orders.*, products.*
    FROM orders
    JOIN users
    ON orders."userId" = users.id
    JOIN order_products
    ON orders.id = order_products. "orderId"
    JOIN products
    ON order_products."productId" = products.id
    WHERE users.username = $1;
    `[username]
    );
    return orders;
  } catch (error) {
    throw error;
  }
};

const getOrdersByProduct = async ({ id }) => {
  //  select and return an array of orders which have a specific productId in their order_products join, include their products
  try {
    const {
      rows: [orders],
    } = await client.query(
      `
    SELECT orders.*, products.*
    FROM orders
    JOIN order_products
    ON orders.id = order_products."orderId"
    JOIN products
    ON order_products."productId" = products.id
    WHERE "productId" = $1;
      `,
      [id]
    );
    return orders;
  } catch (error) {
    throw error;
  }
};

const getCartByUser = async ({ id }) => {
  // getCartByUser({ id }) or getCartByUser(user)
  //  select one user's order (look up by orders."userId")
  //  ...an order that that has status = created
  //  return the order, include the order's products
  try {
    const { rows: order } = await client.query(`
    SELECT * FROM orders
    JOIN users
    ON orders."userId" = users.id
    WHERE users.id = 1
    AND orders.status = 'created';
    `);
    return order;
  } catch (error) {
    throw error;
  }
};

const createOrder = async ({ status, userId }) => {
  // createOrder({ status, userId })
  //  create and return the new order
  try {
    const {
      rows: [order],
    } = await client.query(
      `
    INSERT INTO orders (status, "userId")
    VALUES ($1, $2)
    RETURNING * ;
    `,
      [status, userId]
    );
    return order;
  } catch (error) {
    throw error;
  }
};

const getPendingOrderByUser = async () => {
  // #HELP  NOT CORRECT

  // getPendingOrderByUser,
  //Return the current user's order with status='created' (synonymous to a 'cart'). Use database adapter getPendingOrderByUser
  try {
    const { rows: order } = await client.query(`
    SELECT * FROM orders
    JOIN order_products
    ON order_products."orderId" = orders.id
    JOIN products
    ON products.id = order_products."productId"
    WHERE orders.status = 'created';
    `);
    return order;
  } catch (error) {
    throw error;
  }
};

async function testing() {
  client.connect();
  const order = await getOrdersByUser();
  console.log("order:", order);
}

testing();

module.exports = {
  getOrderById,
  getAllOrders,
  getOrdersByUser,
  getOrdersByProduct,
  getCartByUser,
  createOrder,
  getPendingOrderByUser,
};

// Database Adapters
//  getOrderById
// getOrderById(id)
//  return the order, include the order's products
//
// getAllOrders
//  select and return an array of orders, include their products

//  getOrdersByUser
// getOrdersByUser({ username })
//  select and return an array of orders made by user, include their products

//  getOrdersByProduct

// getOrdersByProduct({ id })
//  select and return an array of orders which have a specific productId in their order_products join, include their products

//  getCartByUser
// getCartByUser({ id }) or getCartByUser(user)
//  select one user's order (look up by orders."userId")
//  ...an order that that has status = created
//  return the order, include the order's products

//  createOrder
// createOrder({ status, userId })
//  create and return the new order
