const SERVER_CONFIGS = '8080'
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const express = require('express');
const app = express()
app.use(express.json());
app.use(express.urlencoded({extended: true}));


const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET);

const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
}

app.post('/checkout', (req, res) => {
  stripe.charges.create(req.body, postStripeCharge(res));
  console.log(req.body);
});


app.listen(8080, error => {
  if (error) throw error;
  console.log('Server running on port: ' + SERVER_CONFIGS);
});