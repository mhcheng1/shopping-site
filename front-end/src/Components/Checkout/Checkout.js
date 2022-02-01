import React from 'react'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const fromDollarToCent = amount => parseInt(amount * 100);

const onToken = (amount, description) => token =>
  axios.post('http://localhost:8080/checkout',
    {
      description,
      source: token.id,
      currency: 'USD',
      amount: fromDollarToCent(amount)
    })
    .then(console.log('payment sucess!'))

const Checkout = ({ name, description, amount }) =>
  <StripeCheckout
     name={name}
     description={description}
     amount={fromDollarToCent(amount)}
     token={onToken(amount, description)}
     currency='USD'
     stripeKey={process.env.REACT_APP_STRIPE_KEY}
     zipCode
     email
     allowRememberMe
  />

export default Checkout;