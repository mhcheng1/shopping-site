import React from 'react';
import { Typography, CardContent, CardMedia, Card, CardActionArea, CardActions, IconButton, Button } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
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
    const [count, setCount] = useState(item.quantity)

    const addCount = async () => {
        setCount(count + 1)
        console.log(count)
        await updateCart(item.id, count)
    }

    const minusCount = () => {
        if (count > 1) {
            setCount(count - 1)
        }
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
                <Button color="secondary" fontSize="small" onClick={() => updateCart(item.id, item.quantity + 1)}> + </Button>
                <IconButton color="primary" aria-label="add to shopping cart">
                    <AddShoppingCartIcon />
                </IconButton>
            </CardActions1>
        </Card>
    );
};

export default CartItem;
