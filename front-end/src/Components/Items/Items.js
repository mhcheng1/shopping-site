import React from 'react';
import Item from './Item'
import { Grid, Container } from '@material-ui/core';
import shop from '../assets/shop.jpg'
import bottom from '../assets/concrete.jpg'
import { Typography, CardContent, CardMedia, Card, CardActionArea, CardActions, IconButton, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react';

const Items = ({ items, addToCart }) => {

    const [value, setValue] = useState('Clothing');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
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
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', justifyContent: 'center', display: 'flex' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="All" value="All" />
                            <Tab label="Clothing" value="Clothing" />
                            <Tab label="Music" value="Music" />
                            <Tab label="Accessories" value="Accessories" />
                        </TabList>
                    </Box>
                    <TabPanel value="All">
                        <Grid container justifyContent='center' spacing={4}>
                            {items.map((item) => (
                                item.categories[0] 
                                ? <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                                    <Item item={item} addToCart={addToCart} />
                                </Grid>
                                : <></>
                            ))}
                        </Grid>
                    </TabPanel>
                    <TabPanel value="Clothing">
                        <Grid container justifyContent='center' spacing={4}>
                            {items.map((item) => (
                                item.categories[0].name === 'Clothing' 
                                ? <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                                    <Item item={item} addToCart={addToCart} />
                                </Grid>
                                : <></>
                            ))}
                        </Grid>
                    </TabPanel>
                    <TabPanel value="Music">
                        <Grid container justifyContent='center' spacing={4}>
                            {items.map((item) => (
                                item.categories[0].name === 'Music' 
                                ? <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                                        <Item item={item} addToCart={addToCart} />
                                    </Grid>
                                :  <></>
                            
                            ))}
                        </Grid>
                    </TabPanel>
                    <TabPanel value="Accessories">
                        <Grid container justifyContent='center' spacing={4}>
                            {items.map((item) => (
                                item.categories[0].name === 'Accessories' 
                                ? <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                                        <Item item={item} addToCart={addToCart} />
                                    </Grid>
                                :  <></>
                            
                            ))}
                        </Grid>
                    </TabPanel>
                </TabContext>
            </Box>
            <Card sx={{ mb: -2, mr: -2, ml: -2 }}>
                <CardMedia
                    component="img"
                    image={bottom}
                    height="100"
                />
            </Card>
        </div>
    );
};

export default Items;
