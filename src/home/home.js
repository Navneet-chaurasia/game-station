
import React from 'react'

import GameCard from '../components/game-cards/gameCards';
import { Container, Row, Col } from 'react-bootstrap';
import {GamesArray} from '../serivces/gamesArray';
import  AuthService  from '../serivces/auth';
import GridCards from '../components/gridCards/gridCards.js';
import SlideShow from '../components/slideshow/slideshow.js';
//home components (renders home page)

class Home extends React.Component{



    render(){

        console.log(AuthService.isLoggedIn());

        //getting all games by deafult and populating in games cards
   const allGames = GamesArray.allGames.map((game)=> 
   <Col xs="auto" sm={6} md="auto" lg={3} key={game.id}><GameCard name={game.name} varsion={game.version} coverImage = {game.coverImage}
   
   category= {game.category} href={game.href} key={game.id}
   ></GameCard></Col>
  );


        return (  <>

        {/* <Container fluid>
        <Row className="justify-content-center">
        {allGames} 
        </Row>
        </Container> */}
        <SlideShow/>
        <GridCards/>

        </>
        );
    }
}


export default Home;