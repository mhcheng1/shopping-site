import React from 'react';
import { Grid } from '@material-ui/core';
import { useEffect, useState} from 'react';
import CartItem from './CartItem';
import styled from 'styled-components'
import Checkout from '../Checkout/Checkout';

const Title = styled.div`
    display: flex;
    justify-content: center;
    font-family: Arial;
    font-size: 40px;
    margin-bottom: 10px;
`
const Cart = ({ cart, updateCart }) => {

    console.log(cart)
    
    return(
        <div> <Title>Cart Total: {cart.subtotal?.formatted_with_symbol}</Title>
        <Grid container justifyContent='center' spacing={4}>
            {cart.line_items.map((item) => (
                <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                    <CartItem item={item} updateCart={updateCart} />
                </Grid>
            ))}
            <Checkout
            name={'SHOP'}
            description={'Checkout'}
            amount={cart.subtotal?.raw}
          />
        </Grid>
        
        </div>
    )
};

export default Cart;
