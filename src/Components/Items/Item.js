import React from 'react';
import { Typography, CardContent, CardMedia, Card, CardActionArea, CardActions, IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import styled from 'styled-components'

// notes: use dangerouslySetInnerHTML to parse out HTML tags in string

const CardActions1 = styled.div`
display: flex;
justify-content: end; 
`
const end = styled.div`
justify-content: end; 
`
const Description = styled.div`
display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const Item = ({ item, addToCart }) => {
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
                    <Typography variant="h5" className="end">
                        {item.price.formatted_with_symbol}
                    </Typography>
                </Description>
                <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{ __html: item.description }} />
            </CardContent>
            <CardActions1>
                <IconButton color="primary" aria-label="add to shopping cart" onClick={() => addToCart(item.id, 1)}>
                    <AddShoppingCartIcon />
                </IconButton>
            </CardActions1>
        </Card>
    );
};

export default Item;
