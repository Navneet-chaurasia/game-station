import NavBar from '../components/navbar/navbar';
import React from 'react'

import GameCard from '../components/game-cards/gameCards';
import { Container, Row, Col } from 'react-bootstrap';
import {GamesArray} from '../serivces/gamesArray';

//home components (renders home page)

class Home extends React.Component{



    render(){

        //getting all games by deafult and populating in games cards
   const allGames = GamesArray.allGames.map((game)=> 
   <Col xs="auto" sm={6} md="auto" lg={3} key={game.id}><GameCard name={game.name} varsion={game.version} coverImage = {game.coverImage}
   
   category= {game.category} href={game.href} key={game.id}
   ></GameCard></Col>
  );


        return (
            <>
  <NavBar title="Wonder Games"></NavBar>

  <Container fluid>
  <Row className="justify-content-center">
  {allGames} 
  </Row>
</Container>



</>
        );
    }
}


export default Home;