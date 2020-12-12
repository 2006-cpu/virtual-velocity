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




// ---------------

// stripeRouter.post('/create-checkout-session', async (req, res, next) => {
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     line_items: [
//       {
//         price_data: {
//           currency: 'usd',
//           product_data: {
//             name: 'T-shirt',
//           },
//           unit_amount: 2000,
//         },
//         quantity: 1,
//       },
//     ],
//     mode: 'payment',
//     success_url: '/success',
//     cancel_url: '/',
//   });


//   res.json({ id: session.id });
// });

// stripeRouter.listen(5000, () => console.log(`Listening on port ${5000}!`));


module.exports = stripeRouter;
