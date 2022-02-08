import React from 'react'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import styled from "styled-components";
import { Typography } from '@material-ui/core';


const Button = styled.button`
  display:flex;
  justify-content: center;
  background-color: blue;
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  text-transform: uppercase;
  margin: 10px 0px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: red;
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;
const Total = styled.div`
    display: flex;
    justify-content: center;
    font-family: Arial;
    font-size: 20px;
    margin-top: 30px;

`
const TotalDiv = styled.div`
    display: flex;
    justify-content: center;
`
const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL
const SERVER_URL = process.env.REACT_APP_SERVER_URL

const fromDollarToCent = amount => parseInt(amount * 100);
// post order detail to backend and redirect if success
const onToken = (amount, description) => token =>
  axios.post(SERVER_URL + '/checkout',
    {
      description,
      source: token.id,
      currency: 'USD',
      amount: fromDollarToCent(amount)
    })
    .then(async (response) => {
      await console.log(response)
      window.location.href = FRONTEND_URL + "/order_complete"
    })
    .catch((error) => {
      alert('Payment Error:' + error)
    })

const Checkout = ({ name, description, amount }) => {

  return (
    <div>
    <Total>{amount? "Total: $" + (Math.round(amount * 100) / 100).toFixed(2): ""}</Total>
    <StripeCheckout
      name={'Checkout'}
      description={'Total: $' + amount}
      amount={fromDollarToCent(amount)}
      token={onToken(amount, description)}
      currency='USD'
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
      zipCode
      allowRememberMe
      billingAddress
      shippingAddress
      >
      <TotalDiv>
        {amount
          ? <Button className="btn">Checkout</Button>
          : <Typography variant='h6'>The cart is empty</Typography> }
      </TotalDiv>
    </StripeCheckout>
    <Typography variant='body1'>{amount? "For testing use this sample card: 4242 4242 4242 4242, EXP: 04/24, CVC: 424": <></>}</Typography>

    </div>
  )
}

export default Checkout;