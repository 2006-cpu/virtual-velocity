const express = require("express");
const stripeRouter = express.Router();
const stripe = require("stripe")(
  "sk_test_51Ht3KIDb1cCPXKe0gynICwL36yklzfwCh1pynYEjOvyxSh4pXzWSob4gm84g6DgEDCaHefsgNL9gQqp5PNPAmQjg00jOeKHYYY"
);

stripeRouter.post("/", async (req, res, next) => {
  const token = req.body.token; // Using Express
  console.log("token:", token);
  const charge = await stripe.charges.create({
    amount: 999,
    currency: "usd",
    description: "Example charge",
    source: token,
  });
  console.log("charge:", charge);
  res.send(charge);
});

module.exports = stripeRouter;
