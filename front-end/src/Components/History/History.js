import React, { useEffect, useState } from 'react'
import axios from 'axios'
import HistoryItems from './HistoryItems'
import { Grid, Container, Typography, Box } from '@material-ui/core';

const SERVER_URL = process.env.REACT_APP_SERVER_URL

const History = ({ user_email }) => {
    const [orders, setOrders] = useState([])
    const [orderItems, setOrderItems] = useState([])

    useEffect(() => {
        if (user_email) {
            axios.get(SERVER_URL + '/api/getOrder', { params: { user_email: user_email } }).then(res => {
                setOrders(res.data)
                console.log(orders)
            })
        }
    }, [])

    useEffect(() => {
        if (orders.length > 0) {
            axios.get(SERVER_URL + '/api/getOrderItem', { params: { receipt: orders[orders.length - 1].receipt_url } }).then(res => {
                setOrderItems(res.data)
                console.log(orderItems)
            })
        }
    }, [orders])

    const handleClick = () => {
        window.open(orders[orders.length - 1]?.receipt_url);
      };

    return (
        <>
        <Box m={2} pt={3} >
            <Grid container justifyContent='center' spacing={4} >
                <Grid xs={10} sm={10} md={10} lg={10} ><Typography variant='h5' sx={{mt: 10}}>Your Order</Typography></Grid>
                {orderItems.map((item) => (
                    <Grid item key={item?.name} xs={10} sm={10} md={10} lg={10}>
                        <HistoryItems item={item} />
                    </Grid>
                ))}
                <Grid xs={10} sm={10} md={10} lg={10}>
                        <Typography>Total: ${orders[orders.length - 1]?.total}</Typography>
                        <Typography>Ordered On: {orders[orders.length - 1]?.date}</Typography>
                        <button onClick={handleClick}>Receipt</button>
                    </Grid>
            </Grid>
            </Box>
        </>
    )
}

export default History