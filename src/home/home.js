
import React from 'react'


import  AuthService  from '../serivces/auth';
// import GridCards from '../components/gridCards/gridCards.js';
import SlideShow from '../components/slideshow/slideshow.js';
import GameCardType2 from '../components/gameCardsType2/gameCardType2.js';

import SlidableRow from '../components/slidableRow/slidableRow.js';
import GameListView from '../components/GameListView/gameListView.js';
//home components (renders home page)
import './home.css'
class Home extends React.Component{



    render(){

        console.log(AuthService.isLoggedIn());



        return (  <>
 <SlideShow/>
        {/* <Container fluid>
        <Row className="justify-content-center">
        {allGames} 
        </Row>
        </Container> */}
       
        {/* <SlidableRow/> */}
        {/* <GridCards/> */}
        <div id="mainHomeDiv">
<GameCardType2/>
{/* <GameCardType3/> */}
{/* <SlidableRow/> */}
<GameListView/>
</div>
        </>
        );
    }
}


export default Home;