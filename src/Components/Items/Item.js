import React from 'react';
import { Typography, CardContent, CardMedia, Card, CardActionArea, CardActions, IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import styled from 'styled-components'

// notes: use dangerouslySetInnerHTML to parse out HTML tags in string
const CardActions1 = styled.div`
display: flex;
justify-content: end; `;


const Item = ({ item, addToCart }) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                image={item.image.url}
                height="200"
            />
            <CardContent>
                <div>
                    <Typography gutterBottom variant="h5">
                        {item.name}
                    </Typography>
                    <Typography variant="h5">
                        {item.price.formatted_with_symbol}
                    </Typography>
                </div>
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
