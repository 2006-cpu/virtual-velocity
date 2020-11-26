const { client } = require("./index");

async function createOrderProduct({ productId, orderId, price, quantity }) {
  try {
    const {
      rows: [order_product],
    } = await client.query(
      `
      INSERT INTO order_products ("productId", "orderId", price, quantity)
      VALUES ($1, $2, $3, $4)
      RETURNING * ;
        `,
      [productId, orderId, price, quantity]
    );

    return order_product;
  } catch (error) {
    throw error;
  }
}

async function getOrderProductById(id) {
  try {
    const {
      rows: [order_product],
    } = await client.query(
      `
      SELECT * FROM order_products
      WHERE id = $1;
        `,
      [id]
    );

    return order_product;
  } catch (error) {
    throw error;
  }
}

//if the productId is NOT on the order yet, create a new order_products?
//conditional within client query?
//case statement?
async function addProductToOrder({ orderId, productId, price, quantity }) {
  try {
    const {
      rows: [order_product],
    } = await client.query(
      `
        INSERT INTO order_products ( "orderId", "productId", price, quantity )
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `,
      [orderId, productId, price, quantity]
    );

    return order_product;
  } catch (error) {
    throw error;
  }
}

async function updateOrderProduct({ id, price, quantity }) {
  try {
    const {
      rows: [order_product],
    } = await client.query(
      `
      UPDATE order_products
      SET price = $2, quantity = $3
      WHERE order_products.id = $1
      RETURNING *;
        `,
      [id, price, quantity]
    );

    return order_product;
  } catch (error) {
    throw error;
  }
}

async function destroyOrderProduct(id) {
  try {
    const {
      rows: [routine_activity],
    } = await client.query(
      `
        DELETE
        FROM order_products
        WHERE id = $1
        RETURNING *;
        `,
      [id]
    );

    return routine_activity;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  client,
  createOrderProduct,
  getOrderProductById,
  addProductToOrder,
  updateOrderProduct,
  destroyOrderProduct,
};
