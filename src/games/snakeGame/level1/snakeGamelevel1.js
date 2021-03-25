import React from 'react';
import GameLogic from './services/logic';
import './css/snakeGame.css';
import { getDeviceType } from './services/getDeviceType';
import Button from '@material-ui/core/Button';
import SnakeNavbar from '../snakeNavbar/snakeNavbar';






class SnakeGame extends React.Component{
  constructor(props) {
    super(props);
    this.logic = null;
    this.state = {'score' : 0,
                   'gameState':"playing"};
    this.inputRef = React.createRef();
    // this.inputRef.current is null here
  }


   
  /**
   * this wll update score
   * @param score
   */
   updateScore(s){
      this.setState({
        score:s
      })
  }

  /**
   * this will update state of game
   * whether pause or resumed or gameOver ETC
   */
  updateGameState(state){
    this.setState({
      gameState : state
    })
  }
  componentDidMount() {

    //disable default touch behaviour 
    document.body.style.touchAction="none"

      //create object of gameLogic class
      //check device type
      if(getDeviceType() === "desktop"){
        this.logic = new GameLogic(this.inputRef.current,1,this);

      }else if(getDeviceType() === "mobile"){
        this.logic = new GameLogic(this.inputRef.current,2,this);

      }else{
        this.logic = new GameLogic(this.inputRef.current,1,this);

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
      <SnakeNavbar score={ <Button    size="small" color="primary" id="snakeGameRestartButton">{"SCORE "+ this.state.score} </Button>} 
      restartButton={  <Button   onClick={()=>this.logic.restart()} size="small" color="primary" id="snakeGameRestartButton"> Restart </Button>}
      pauseButton ={  <Button   onClick={()=> this.state.gameState === "playing" ?  this.logic.pauseGame() : this.logic.resumeGame()} size="small" color="primary" id="snakeGameRestartButton">{this.state.gameState === "playing" ? "Pause" : "Resume"}</Button>}
      ></SnakeNavbar>
    
       <center><canvas ref={this.inputRef} id="snakeGameCanvas" muted="muted"></canvas></center></> 
    );
  }

}

export default SnakeGame;