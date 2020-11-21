const router = require("express").Router();

const { getAllProducts, getProductById } = require("../db/utils");

router.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

router.get("/:productId", async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await getProductById(productId);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
