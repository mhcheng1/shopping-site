import React from 'react';
import { Grid } from '@material-ui/core';
import { useEffect, useState} from 'react';
import CartItem from './CartItem';

const Cart = ({ cart }) => {

    console.log(cart)
    
    return(
        <Grid container justifyContent='center' spacing={4}>
            {cart.line_items.map((item) => (
                <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                    <CartItem item={item} />
                </Grid>
            ))}
        </Grid>
    )
};

export default Cart;
