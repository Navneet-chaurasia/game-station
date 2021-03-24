import React from 'react';
import GameLogic from './services/logic';
import './css/snakeGame.css';
import { getDeviceType } from './services/getDeviceType';
import Button from '@material-ui/core/Button';






class SnakeGame extends React.Component{
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
    // this.inputRef.current is null here
  }


   logic;
  
  componentDidMount() {

    //disable default touch behaviour 
    document.body.style.touchAction="none"

      //create object of gameLogic class
      //check device type
      if(getDeviceType() === "desktop"){
        this.logic = new GameLogic(this.inputRef.current,1);

      }else if(getDeviceType() === "mobile"){
        this.logic = new GameLogic(this.inputRef.current,2);

      }else{
        this.logic = new GameLogic(this.inputRef.current,1);

      }
     
     //start playing the game
     this.logic.play();
   
    //draw everything on the canvas
    this.fun =  document.addEventListener("keydown",e=> this.logic.direction(e));

    this.fun =  document.addEventListener('touchstart',e=> this.logic.handleTouch(e),false);

    this.fun =  document.addEventListener('touchmove',e=> this.logic.gestureHandler(e),false);

     

     }


  //do some clean up when component destroyed
  componentWillUnmount(){
    document.removeEventListener('keydown',e=>this.logic.direction(e))

    this.fun =  document.addEventListener('touchstart',e=> this.logic.handleTouch(e),false);

    this.fun =  document.addEventListener('touchmove',e=> this.logic.gestureHandler(e),false);

    document.body.style.touchAction="initial"
  }


  //render method
  render(){
    return(
      <>
      <Button   onClick={()=>this.logic.restart()} size="small" color="primary" id="snakeGameRestartButton"> restart </Button>
       <center><canvas ref={this.inputRef} id="snakeGameCanvas"></canvas></center></> 
    );
  }

}

export default SnakeGame;