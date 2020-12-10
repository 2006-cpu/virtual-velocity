const express = require("express");
const orderProductsRouter = express.Router();
const { requireUser } = require("./utils");
const {
  getOrderById,
  getUserById,
  updateOrderProduct,
} = require("../db/utils.js");

const { getOrderProductById, destroyOrderProduct } = require("../db/utils");

orderProductsRouter.patch(
  "/:orderProductId",
  requireUser,
  async (req, res, next) => {
    const { orderProductId } = req.params;
    const { price, quantity } = req.body;

    try {
      const orderProduct = await getOrderProductById(orderProductId);
      const order = await getOrderById(orderProduct.orderId);
      const user = await getUserById(order.userId);

      if (req.user.id === order.userId) {
        const updatedOrderProducts = await updateOrderProduct({
          id: orderProductId,
          price,
          quantity,
        });
        res.send(updatedOrderProducts);
      } else {
        next({
          message:
            "Logged in user should be the owner of the updated order_product.",
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

orderProductsRouter.delete(
  "/:orderProductId",
  requireUser,
  async (req, res, next) => {
    const { orderProductId } = req.params;
    const id = req.params.orderProductId;

    try {
      const orderProduct = await getOrderProductById(orderProductId);
      const order = await getOrderById(orderProduct.orderId);
      const user = await getUserById(order.userId);

      if (req.user.id === order.userId) {
        const deletedOrderProduct = await destroyOrderProduct(id);
        res.send(deletedOrderProduct);
      } else {
        next({
          message:
            "Logged in user should be the owner of the deleted order_product.",
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = orderProductsRouter;
