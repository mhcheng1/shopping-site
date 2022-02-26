import React from 'react';
import { Typography, CardContent, Card } from '@mui/material';
import styled from 'styled-components'
import {useState} from 'react';

const Description = styled.div`
    display: flex;
    justify-content: space-between;
`

const HistoryItems = ({ item }) =>{
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardContent>
                <Description>
                    <Typography gutterBottom variant="h5">
                        {item.name}
                    </Typography>
                    <Typography variant="h5">
                        x {item.item_quantity}
                    </Typography>
                    <Typography variant="h5">
                        {item.price}
                    </Typography>
                </Description>
            </CardContent>
        </Card>
    );
};

export default HistoryItems;
