import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';


const Items = () => {
  return(
    <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
        <CardMedia
            component="img"
            height="140"
            image="https://cdn.pixabay.com/photo/2013/07/12/18/20/shoes-153310_960_720.png"
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
            </Typography>
        </CardContent>
        </CardActionArea>
        <CardActions>
        <Button size="small" color="primary">
            Share
        </Button>
        </CardActions>
        </Card>
    );  
};

export default Items;
