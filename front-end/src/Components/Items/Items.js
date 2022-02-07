import React from 'react';
import Item from './Item'
import { Grid, Container } from '@material-ui/core';
import shop from './shop.jpg'
import { Typography, CardContent, CardMedia, Card, CardActionArea, CardActions, IconButton, Button } from '@mui/material';

const Items = ({ items, addToCart }) => {
    console.log(items)
    return (
        <div>
            <Card sx={{ mb: 2 }}>
                <CardMedia
                    component="img"
                    image={shop}
                    height="600"
                />
            </Card>
            <Grid container justifyContent='center' spacing={4}>
                {items.map((item) => (
                    <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                        <Item item={item} addToCart={addToCart} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Items;
