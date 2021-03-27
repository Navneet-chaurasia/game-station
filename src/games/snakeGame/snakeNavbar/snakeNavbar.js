import { Button } from '@material-ui/core';
import React from 'react'
import { Navbar,Nav,} from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
      <p>{this.props.score}</p>
      <p>{this.props.restartButton}</p>
      <p>{this.props.pauseButton}</p>
     <p><Link to = '/games/snakeGame/settings'> <Button   size="small" color="primary" id="snakeGameRestartButton">Settings</Button></Link></p>
     
    </Nav>
      </Navbar>
    }
}


export default SnakeNavbar;