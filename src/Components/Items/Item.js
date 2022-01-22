import React from 'react';
import { Typography, CardContent, CardMedia, Card, CardActionArea, CardActions, IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import styled from 'styled-components'

// notes: use dangerouslySetInnerHTML to parse out HTML tags in string

const Item = ({ item }) => {

    const CardActions = styled.div`
        display: flex;
        justify-content: end; `;

    console.log(item)
    return (
        <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    image={item.image.url}
                    height="200"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{ __html: item.description }} />
                </CardContent>
            <CardActions>
                <IconButton color="primary" aria-label="add to shopping cart">
                    <AddShoppingCartIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default Item;
