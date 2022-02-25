import { Typography } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux'


const Order = ({ emptyCart }) => {
    useEffect(()=>{
        emptyCart()
    }, [])

    const receipt = useSelector(state => state.receipt)
    const handleClick = () => {
        window.open(receipt);
      };

    return(
        <div>
            <Typography variant='h6' style={{ display:'flex', justifyContent: 'center', paddingTop: '100px'}}>
                Thank you for your purchase. Here is your reciept
            </Typography>
            <Typography variant='h6' style={{ display:'flex', justifyContent: 'center', paddingTop: '10px' }}>
                <button onClick={handleClick}>Receipt</button>
            </Typography>
        </div>
    )
};

export default Order;
