import React from 'react';
import GameLogic from './services/logic';
import './css/snakeGame.css';






class SnakeGame extends React.Component{
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
    // this.inputRef.current is null here
  }


   logic;
  
  componentDidMount() {


      //create object of gameLogic class
     this.logic = new GameLogic(this.inputRef.current);

     //start playing the game
     this.logic.play();
   
    //draw everything on the canvas
    this.fun =  document.addEventListener("keydown",e=> this.logic.direction(e));

    this.fun =  document.addEventListener('touchstart',e=> this.logic.handleTouchStart(e),false);

    this.fun =  document.addEventListener('touchmove',e=> this.logic.gestureHandler(e),false);

     

     }


  //do some clean up when component destroyed
  componentWillUnmount(){
    document.removeEventListener('keydown',e=>this.logic.direction(e))

    this.fun =  document.addEventListener('touchstart',e=> this.logic.handleTouchStart(e),false);

    this.fun =  document.addEventListener('touchmove',e=> this.logic.gestureHandler(e),false);
  }


  //render method
  render(){
    return(

       <center><canvas ref={this.inputRef} id="snakeGameCanvas"></canvas></center> 
    );
  }

}

export default SnakeGame;