
import React from 'react'


import  AuthService  from '../serivces/auth';
import GridCards from '../components/gridCards/gridCards.js';
import SlideShow from '../components/slideshow/slideshow.js';

//home components (renders home page)

class Home extends React.Component{



    render(){

        console.log(AuthService.isLoggedIn());



        return (  <>

        {/* <Container fluid>
        <Row className="justify-content-center">
        {allGames} 
        </Row>
        </Container> */}
        <SlideShow/>
        {/* <SlidableRow/> */}
        <GridCards/>

        </>
        );
    }
}


export default Home;