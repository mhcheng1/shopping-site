import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import CartItem from './CartItem';
import styled from 'styled-components'
import Checkout from '../Checkout/Checkout';
import { useSelector, useDispatch } from 'react-redux'
import { userId } from '../../Actions/userId';


const TitleDiv = styled.div`
    display: flex;
    justify-content: center;
    font-family: Arial;
    font-size: 40px;
`
const Title = styled.div`
    display: flex;
    justify-content: center;
    font-family: Arial;
    font-size: 30px;
    margin-top: 30px;
    margin-bottom: 30px;
`
const Cart = ({ cart, updateCart }) => {
    const isLogged = useSelector(state => state.isLogged)
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user)
    const testUser = () => {
        dispatch(userId('test@gmail.com'))
    }


    if (isLogged) {
        return (
            <div>
                <Title>
                    {cart.total_items ? 'Your Cart' : ''}
                </Title>
                <Grid container justifyContent='center' spacing={4}>
                    {cart.line_items.map((item) => (
                        <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                            <CartItem item={item} updateCart={updateCart} />
                        </Grid>
                    ))}
                </Grid>
                <TitleDiv >
                    <Checkout
                        name={'SHOP'}
                        description={'Checkout'}
                        amount={cart.subtotal?.raw}
                        cart={cart}
                    />
                </TitleDiv>
            </div>
        )
    }
    else {
        return (
            <>
            <Typography variant='h6' style={{ display:'flex', justifyContent: 'center', paddingTop: '100px'}}>
                Please sign in first
            </Typography>
                <div style={{ display:'flex', justifyContent: 'center', paddingTop: '10px'}}>
                    <button onClick={testUser}>Log in as test user</button>
                </div>
            </>
        )
    }
};

export default Cart;
