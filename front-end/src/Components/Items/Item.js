import React from 'react';
import { Typography, CardContent, CardMedia, Card, IconButton, Button } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import styled from 'styled-components'
import {useState} from 'react';


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

const Item = ({ item, addToCart }) =>{
    const [count, setCount] = useState(1)

    // operations for updating cart item count
    const addCount = () => {
        setCount(count + 1)
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
                height="300"
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
                    {count}
                </Typography>
                <Button color="secondary" fontSize="small" onClick={() => addCount()}> + </Button>
                <IconButton color="primary" aria-label="add to shopping cart" onClick={() => addToCart(item.id, count)}>
                    <AddShoppingCartIcon />
                </IconButton>
            </CardActions1>
        </Card>
    );
};

export default Item;
