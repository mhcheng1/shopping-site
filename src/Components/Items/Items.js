import React from 'react';
import Item from './Item'
import { Grid } from '@material-ui/core';


const Items = ({ items, addToCart }) => {
    return (
        <Grid container justifyContent='center' spacing={4}>
            {items.map((item) => (
                <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                    <Item item={item} addToCart={addToCart} />
                </Grid>
            ))}
        </Grid>
    );
};

export default Items;
