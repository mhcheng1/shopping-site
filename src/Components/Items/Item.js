import React from 'react';
import { Typography, CardContent, CardMedia, Card, Button, CardActionArea, CardActions } from '@mui/material';

// notes: use dangerouslySetInnerHTML to parse out HTML tags in string

const Item = ({ item }) => {
    console.log(item)
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={item.image.url}
                    height="200"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{__html: item.description}} />
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Add to Cart
                </Button>
            </CardActions>
        </Card>
    );
};

export default Item;
