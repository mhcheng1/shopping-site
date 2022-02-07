import { Typography } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';


const Order = ({ cart, emptyCart }) => {
    // const [storedCart, setStoredCart] = useState(false)
    // useEffect(()=>{
    //     if (cart.total_items !== 0) {
    //         setStoredCart(cart)
    //     }
    // }, [cart])

    useEffect(()=>{
        emptyCart()
    }, [])

    return(
        <Typography variant='h6' style={{ display:'flex', justifyContent: 'center' }}>Thank you for your purchase. Press the home button to keep shopping</Typography>
    )
};

export default Order;
