const express = require('express');
const router = express.Router();
const STRIPE_SECRET_KEY = process.env.REACT_APP_STRIPE_SECRET;
const stripe = require('stripe')(STRIPE_SECRET_KEY);


// *********************  Stripe Payment ************************* //
// create stripe charges
const postStripeCharge = res => (stripeErr, stripeRes) => {
    if (stripeErr) {
        res.status(500).send({ error: stripeErr });
    } else {
        res.status(200).send({ success: stripeRes });
    }
}
router.post('/', async (req, res) => {
    await stripe.charges.create(req.body, postStripeCharge(res))
});


module.exports = router;