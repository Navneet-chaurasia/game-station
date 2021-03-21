//this will render game cards to show brief info about games


import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    maxWidth: 320,
   textOverflow:'hide',
    marginLeft: 5,
  
    
    marginTop:10,
 

  },
  media: {
    height: 180,
  },
});



export default function GameCard(props) {

  
 
  const classes = useStyles();
     
  
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
         component="img"
       
          className={classes.media}
          image= {props.coverImage}
          title={props.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {props.name} 
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Link to="/game"> 
        <Button size="small" color="primary">
       
         Play
         
        
        </Button>
        </Link>
        <Button size="small" color="primary">
           Bookmark
        </Button>
        
      </CardActions>
    </Card>
  );
}