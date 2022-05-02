import { Typography } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux'

// return the receipt of the order and a button that links to it
const Order = ({ emptyCart }) => {
    // On load empty cart
    useEffect(() => {
        emptyCart()
    }, [])

    // get receipt url from redux state
    const receipt = useSelector(state => state.receipt)
    const handleClick = () => {
        window.open(receipt);
    };

    return (
        <div>
            <Typography variant='h6' style={{ display: 'flex', justifyContent: 'center', paddingTop: '100px' }}>
                Thank you for your purchase. Here is your reciept
            </Typography>
            <Typography variant='h6' style={{ display: 'flex', justifyContent: 'center', paddingTop: '10px' }}>
                <button onClick={handleClick}>Receipt</button>
            </Typography>
        </div>
    )
};
export default Order;
