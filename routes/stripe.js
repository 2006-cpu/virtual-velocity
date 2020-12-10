const express = require("express");
const stripeRouter = express.Router();
const stripe = require("stripe")(`${process.env.REACT_APP_PUBLISHABLE_KEY}`);

stripeRouter.post("/", async (req, res, next) => {
  const token = req.body.token; // Using Express

  const charge = await stripe.charges.create({
    amount: 999,
    currency: "usd",
    description: "Example charge",
    source: token,
  });

  res.send(charge);
});

module.exports = stripeRouter;
