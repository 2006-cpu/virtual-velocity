const { client } = require("./index");

const reduceOrders = (queriedOrders) => {
  const ordersWithProducts = queriedOrders.reduce((acc, order) => {
    const {
      id,
      status,
      userId,
      datePlaced,
      productId,
      orderId,
      totalProductPrice,
      quantity,
      name,
      description,
      price,
      imageURL,
      inStock,
      category,
    } = order;

    const product = {
      id: productId,
      name,
      description,
      price,
      imageURL,
      inStock,
      category,
      quantity,
      totalProductPrice,
    };

    if (!acc[id]) {
      acc[id] = {
        id,
        status,
        userId,
        datePlaced,
        products: productId ? [product] : [],
      };
    } else {
      if (productId) {
        acc[id].products.push(product);
      }
    }

    return acc;
  }, {});
  return Object.values(ordersWithProducts);
};

// return the order, include the order's products
const getOrderById = async (id) => {
  try {
    const { rows: orders } = await client.query(
      `
        SELECT 
        orders.id, 
        orders.status, 
        orders."userId", 
        orders."datePlaced", 
        order_products."productId",
        order_products."orderId",
        order_products.price as "totalProductPrice",
        order_products.quantity,
        products.name,
        products.description,
        products.price,
        products."imageURL",
        products."inStock",
        products.category
        FROM orders
        LEFT JOIN order_products
        ON orders.id = order_products."orderId"
        LEFT JOIN products
        ON products.id = order_products."productId"
        WHERE orders.id = $1;
`,
      [id]
    );
    return reduceOrders(orders)[0];
  } catch (error) {
    throw error;
  }
};

//  select and return an array of orders, include their products
const getAllOrders = async () => {
  try {
    const { rows: orders } = await client.query(`
        SELECT
        orders.id,
        orders.status,
        orders."userId",
        orders."datePlaced",
        order_products."productId",
        order_products."orderId",
        order_products.price as "totalProductPrice",
        order_products.quantity,
        products.name,
        products.description,
        products.price,
        products."imageURL",
        products."inStock",
        products.category
        FROM orders
        LEFT JOIN order_products
        ON order_products."orderId" = orders.id
        LEFT JOIN products
        ON products.id = order_products."productId"
`);
    return reduceOrders(orders);
  } catch (error) {
    throw error;
  }
};

//  select and return an array of orders made by user, inlude their products
const getOrdersByUser = async ({ id }) => {
  try {
    const { rows: orders } = await client.query(
      `
        SELECT 
        orders.id, 
        orders.status, 
        orders."userId", 
        orders."datePlaced", 
        order_products."productId",
        order_products."orderId",
        order_products.price as "totalProductPrice",
        order_products.quantity,
        products.name,
        products.description,
        products.price,
        products."imageURL",
        products."inStock",
        products.category
        FROM orders
        LEFT JOIN order_products
        ON order_products."orderId" = orders.id
        LEFT JOIN products
        ON products.id = order_products."productId"
        WHERE orders."userId" = $1;
`,
      [id]
    );
    return reduceOrders(orders);
  } catch (error) {
    throw error;
  }
};

//  select and return an array of orders which have a specific productId in their order_products join, include their products
const getOrdersByProduct = async ({ id }) => {
  try {
    const { rows: orders } = await client.query(
      `
        SELECT 
        orders.id, 
        orders.status, 
        orders."userId", 
        orders."datePlaced", 
        order_products."productId",
        order_products."orderId",
        order_products.price as "totalProductPrice",
        order_products.quantity,
        products.name,
        products.description,
        products.price,
        products."imageURL",
        products."inStock",
        products.category
        FROM orders
        LEFT JOIN order_products
        ON order_products."orderId" = orders.id
        LEFT JOIN products
        ON products.id = order_products."productId"
        WHERE orders.id 
        IN (
        SELECT "orderId"
        FROM order_products
        WHERE "productId"=$1
        );
`,
      [id]
    );
    return reduceOrders(orders);
  } catch (error) {
    throw error;
  }
};

//  select one user's order (look up by orders."userId")
//  ...an order that that has status = created
//  return the order, include the order's products
const getCartByUser = async ({ id }) => {
  try {
    const { rows: orders } = await client.query(
      `
        SELECT 
        orders.id, 
        orders.status, 
        orders."userId", 
        orders."datePlaced", 
        order_products."productId",
        order_products."orderId",
        order_products.price as "totalProductPrice",
        order_products.quantity,
        products.name,
        products.description,
        products.price,
        products."imageURL",
        products."inStock",
        products.category
        FROM orders
        LEFT JOIN order_products
        ON order_products."orderId" = orders.id
        LEFT JOIN products
        ON products.id = order_products."productId"
        WHERE orders."userId" = $1
        AND orders.status = 'created';
`,
      [id]
    );
    return reduceOrders(orders)[0];
  } catch (error) {
    throw error;
  }
};

//  create and return the new order
const createOrder = async ({ status, userId }) => {
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

const updateOrder = async ({ id, ...fields }) => {
  const fieldKeys = Object.keys(fields);

  const setString = fieldKeys
    .map((fieldName, index) => {
      return `"${fieldName}"=$${index + 1}`;
    })
    .join(", ");

  const setValues = Object.values(fields);
  setValues.push(id);

  if (fieldKeys.length === 0) {
    return;
  }

  try {
    const {
      rows: [order],
    } = await client.query(
      `
          UPDATE orders
          SET ${setString}
          WHERE id = $${setValues.length}
          RETURNING *;
          `,
      setValues
    );
    return order;
  } catch (error) {
    throw error;
  }
};

// Find the order with id equal to the passed in id
// Only update the status to completed
// Return the updated order
const completeOrder = async ({ id }) => {

  try {
    const {
      rows: [order],
    } = await client.query(
      `
    UPDATE orders
    SET status = 'completed'
    WHERE id = $1
    RETURNING *;
`,
      [id]
    );

    return order;
  } catch (error) {
    throw error;
  }
};
    
// Update the order's status to cancelled
const cancelOrder = async (id) => {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
    UPDATE orders
    SET status = 'cancelled'
    WHERE id = $1
    RETURNING *;
`,
      [id]
    );
    return order;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getOrderById,
  getAllOrders,
  getOrdersByUser,
  getOrdersByProduct,
  getCartByUser,
  createOrder,
  updateOrder,
  completeOrder,
  cancelOrder,
};
