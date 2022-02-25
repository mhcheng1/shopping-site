import React from 'react'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import styled from "styled-components";
import { Typography } from '@material-ui/core';
import { Navigate } from "react-router-dom"
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'


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

const Checkout = ({ name, description, amount, cart }) => {
  const [checked, setChecked] = useState(0)
  var tempDate, date;
  const user_email = useSelector(state => state.user)

  // post order detail to backend and redirect to order_complete page if success
  const onToken = (amount, description) => token =>
    // post to stripe to verify order
    axios.post(SERVER_URL + '/checkout',
      {
        description,
        source: token.id,
        currency: 'USD',
        amount: fromDollarToCent(amount)
      })
      .then(function (response) {
        // get time when order complete
        tempDate = new Date();
        date = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
        console.log(response)

        const res = response.data.success

        const checkoutCart = cart.line_items.map(prod => {
          return [res.receipt_url, prod.product_id, prod.quantity]
        })

        axios.post(SERVER_URL + '/api/insertOrderItem', checkoutCart)
          .catch(function (error) {
            console.log("error in post insertOrder", error)
          })
          
        // redirect
        setChecked(1)

        // post success order detail to database
        axios.post(SERVER_URL + '/api/insertOrder',
          {
            email: user_email,
            reciept_url: res.receipt_url,
            total: +(res.amount) / 100,
            date: date
          })
          .catch(function (error) {
            console.log("error in post insertOrder", error)
          })
      })


  return checked ?
    (<Navigate to="/order_complete" replace={true} />)
    : (
      <div>
        <Total>{amount ? "Total: $" + (Math.round(amount * 100) / 100).toFixed(2) : ""}</Total>
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
              : <Typography variant='h6'>The cart is empty</Typography>}
          </TotalDiv>
        </StripeCheckout>
        <Typography variant='body1'>{amount ? "For testing use this sample card: 4242 4242 4242 4242, EXP: 04/24, CVC: 424" : <></>}</Typography>
      </div>
    )
}

export default Checkout;