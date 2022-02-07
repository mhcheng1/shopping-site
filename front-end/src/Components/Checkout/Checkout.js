import React from 'react'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const fromDollarToCent = amount => parseInt(amount * 100);
// post order detail to backend and redirect if success
const onToken = (amount, description) => token =>
  axios.post('http://localhost:8080/checkout',
    {
      description,
      source: token.id,
      currency: 'USD',
      amount: fromDollarToCent(amount)
    })
    .then( function(response) {
      console.log(response)
    }
      //window.location.href = "http://localhost:3000/order_complete"
    )

const Checkout = ({ name, description, amount }) => {
  return (
    <StripeCheckout
     name={name}
     description={description}
     amount={fromDollarToCent(amount)}
     token={onToken(amount, description)}
     currency='USD'
     stripeKey={process.env.REACT_APP_STRIPE_KEY}
     zipCode
     allowRememberMe
     billingAddress
     shippingAddress
  />
  )
}

export default Checkout;