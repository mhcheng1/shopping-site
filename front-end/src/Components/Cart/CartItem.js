import React from 'react';
import { Typography, CardContent, CardMedia, Card, CardActionArea, CardActions, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import styled from 'styled-components'
import { useEffect, useState} from 'react';


// note: use dangerouslySetInnerHTML to parse out HTML tags in string
// button onClick expects a function instead of value

const CardActions1 = styled.div`
    display: flex;
    justify-content: end; 
`
const Description = styled.div`
    display: flex;
    justify-content: space-between;
`

const CartItem = ({ item, updateCart }) =>{
    const addCount = () => {
        updateCart(item.id, {quantity: item.quantity + 1})
    }
    const minusCount = () => {
        if (item.quantity >= 1) {
            updateCart(item.id, {quantity: item.quantity - 1})
        }
    }
    const deleteItem = () => {
        updateCart(item.id, {quantity: 0})
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                image={item.image.url}
                height="200"
            />
            <CardContent>
                <Description>
                    <Typography gutterBottom variant="h5">
                        {item.name}
                    </Typography>
                    <Typography variant="h5">
                        {item.price.formatted_with_symbol}
                    </Typography>
                </Description>
                <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{ __html: item.description }} />
            </CardContent>
            <CardActions1>
                <Button color="secondary" fontSize="small" onClick={() => minusCount()} > - </Button>
                <Typography variant="h6">
                    {item.quantity}
                </Typography>
                <Button color="secondary" fontSize="small" onClick={() => addCount()}> + </Button>
                <IconButton color="primary" aria-label="add to shopping cart" onClick={() => deleteItem()}>
                    <DeleteIcon />
                </IconButton>
            </CardActions1>
        </Card>
    );
};

export default CartItem;
