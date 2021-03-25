import React from 'react'
import { Navbar,Nav,} from 'react-bootstrap';

import './snakeNavbar.css'
/**
 * This is a navbar component for snake game
 * Every game shold implement there own navbar beacause each game may have
 * different option and actions for navbar
 */

class SnakeNavbar extends React.Component{

   
    render(){
    return    <Navbar bg="transparent" fixed="top" >
        <Nav className="mr-auto">
      <Nav.Link ><p>{this.props.score}</p></Nav.Link>
      <Nav.Link  ><p>{this.props.restartButton}</p></Nav.Link>
      <Nav.Link  ><p>{this.props.pauseButton}</p></Nav.Link>
     
    </Nav>
      </Navbar>
    }
}


export default SnakeNavbar;