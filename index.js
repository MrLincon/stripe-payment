const express = require("express");
const app = express();
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = require("stripe")('pk_test_51Kzol6AL9jqqiGBJJrHavDRI6cyZ5WwxRBPiZpYUDQB7zQWRxoqom3Oth0JdP9a0cGCCmIu3CNtxGyWfud4Mqvbj00iZRpWg3z');

app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.get("/working", async (req, res) => {
  res.send("Working!"); 
});
const PORT = process.env.PORT || 5005
app.listen(PORT,() => console.log('Node server listining on port ${PORT}'));

// app.listen(4242, () => console.log("Node server listening on port 3000!"));