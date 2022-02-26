import React from 'react';
import { Typography, CardContent, CardMedia, Card, IconButton, Button } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import styled from 'styled-components'
import {useState} from 'react';


// note: use dangerouslySetInnerHTML to parse out HTML tags in string
// button onClick expects a function instead of value

const Description = styled.div`
    display: flex;
    justify-content: space-between;
`

const HistoryItems = ({ item }) =>{
    const [count, setCount] = useState(1)

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
