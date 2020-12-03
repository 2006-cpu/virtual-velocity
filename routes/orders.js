const express = require("express");
const ordersRouter = express.Router();
const { requireUser, isAdmin } = require("./utils");
const { addProductToOrder } = require("../db/order_products");
const {
  getAllOrders,
  getCartByUser,
  createOrder,
  updateOrder,
  cancelOrder,
} = require("../db/utils");


ordersRouter.get("/", [requireUser, isAdmin], async (req, res, next) => {
  try {
    const orders = await getAllOrders();
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

ordersRouter.get("/cart", requireUser, async (req, res, next) => {
  try {
    const order = await getCartByUser(req.user);
    res.send(order);
  } catch (error) {
    next(error);
  }
});

ordersRouter.post("/", requireUser, async (req, res, next) => {
  try {
    const order = await createOrder({ status: "created", userId: req.user.id });
    res.send(order);
  } catch (error) {
    next(error);
  }
});

ordersRouter.patch("/:orderId", requireUser, async (req, res, next) => {
  // Orders - API Routes
  //  PATCH /orders/:orderId (**)
  // Update an order, notably change status

  const { orderId } = req.params;
  const { status } = req.body;
  const { userId } = req.user.id;
  
  try {
    const order = await updateOrder({ orderId, status, userId });
    res.send(order);
  } catch (error) {
    next(error);
  }
});

ordersRouter.delete("/:orderId", requireUser, async (req, res, next) => {
  // CANCEL ORDER
  //  DELETE /orders/:orderId (**)
  // Update the order's status to cancelled
  const { orderId } = req.params;
  // const {status} = req.body
  try {
    const order = await cancelOrder(orderId);
    res.send(order);
  } catch (error) {
    next(error);
  }
});

//Add a single product to an order (using order_products). Prevent duplication on ("orderId", "productId") pair. If product already exists on order, increment quantity and update price.
ordersRouter.post( "/:orderId/products", requireUser, async (req, res, next) => {
    const { orderId } = req.params;
    const { productId, price, quantity } = req.body;

    try {
      const orderProduct = await addProductToOrder({
          orderId,
          productId,
          price,
          quantity
      });
      res.send(orderProduct);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = ordersRouter;
