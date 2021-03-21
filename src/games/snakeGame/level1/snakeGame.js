import React from 'react';

import './snakeGame.css';
import  foodImage  from './assets/images/food.png'
import deadSound from './assets/sounds/dead.mp3'
import downSound from './assets/sounds/down.mp3'
import eatSound from './assets/sounds/eat.mp3'
import leftSound from './assets/sounds/left.mp3'
import rightSound from './assets/sounds/right.mp3'
import upSound from './assets/sounds/up.mp3'





class SnakeGame extends React.Component{
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
    // this.inputRef.current is null here
  }

  fun;

  
  componentDidMount() {
  //loading images and audio files
const foodImg = new Image();
const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const down = new Audio();
const right = new Audio();
const left = new Audio();
   
    var canvas = this.inputRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = Math.floor(window.innerWidth/ 32) * 32 - 32;
    canvas.height = Math.floor(window.innerHeight / 32) * 32;
    const MAX_HEIGHT = canvas.height / 32;
    const MAX_WIDTH = canvas.width / 32;
    const box = 32;
    
    
    
    foodImg.src =  foodImage;
    dead.src = deadSound;
    eat.src = eatSound;
    up.src = upSound;
    down.src = downSound;
    right.src = rightSound;
    left.src = leftSound;
    
     var score  = 0;
    var dir;
    
    //create the snake
    var snake = [];
    snake[0] = {
        x: Math.floor(MAX_WIDTH / 2) * box,
        y: Math.floor(MAX_HEIGHT / 2) * box
    };
    
    //create the food
    var food = {
        x: Math.floor(Math.random() * (MAX_WIDTH)) * box,
        y: Math.floor(Math.random() * (MAX_HEIGHT)) * box
    };
    
    //draw everything on the canvas
   
    
    function drawBoard() {
        for (let i = 32; i < MAX_WIDTH * box; i += 32) {
            ctx.moveTo(i, MAX_HEIGHT * box);
            ctx.lineTo(i, 0);
        }
        for (let  i = 32; i < MAX_HEIGHT * box; i += 32) {
            ctx.moveTo(0, i);
            ctx.lineTo(MAX_WIDTH * box, i);
        }
    
    
        ctx.strokeStyle = "gray";
        ctx.stroke();
    }
    
    
    function draw() {
    
        canvas.width = Math.floor(window.innerWidth / 32) * 32 - 32;
        canvas.height = Math.floor(window.innerHeight / 32) * 32;
        drawBoard();
    
        for (var i = 0; i < snake.length; i++) {
            ctx.fillStyle = (i === 0) ? "#33ff00" : "#66cc33";
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
    
            ctx.strokeStyle = "black";
            ctx.strokeRect(snake[i].x, snake[i].y, box, box);
        }
    
        ctx.drawImage(foodImg, food.x, food.y);
    
        var snakeX = snake[0].x;
        var snakeY = snake[0].y;
        if (dir === "up") snakeY -= box;
        else if (dir === "down") snakeY += box;
        else if (dir === "right") snakeX += box;
        else if (dir === "left") snakeX -= box;
    
    
        if (snakeX === food.x && snakeY === food.y) {
            if(score===0){
                score++;
            }
            else if(score%10===0){
                score+=101;
            }else{
                score++;
            }
            eat.play();
            food = {
                x: Math.floor(Math.random() * (MAX_WIDTH)) * box,
                y: Math.floor(Math.random() * (MAX_HEIGHT)) * box
            };
        } else {
            snake.pop();
        }
    
        if (snakeX < 0 || snakeX >= MAX_WIDTH * box || snakeY < 0 || snakeY >= MAX_HEIGHT * box) {
            clearInterval(game);
            ctx.fillStyle = "red";
            ctx.font = "230px Changa one";
            ctx.fillText("GAME OVER!", 25, Math.floor(MAX_HEIGHT / 2) * box);
            dead.play();
        }
        for (let  i = 0; i < snake.length; i++) {
            if ((snake[i].x === snakeX && snake[i].y === snakeY)) {
                clearInterval(game);
                ctx.fillStyle = "red";
                ctx.font = "230px Changa one";
                ctx.fillText("GAME OVER!", 25, Math.floor(MAX_HEIGHT / 2) * box);
                dead.play();
            }
        }
        var newHead = {
            x: snakeX,
            y: snakeY
        };
        snake.unshift(newHead);
    
        ctx.fillStyle = "white";
        ctx.font = "45px Changa one";
        ctx.fillText("SCORE: " + score, 2 * box, 1.6 * box);
    
    }
    
    this.fun = function direction(x) {
      var key = x.code;
  
      if (key === "Escape") {
          clearInterval(game);
          ctx.fillStyle = "red";
          ctx.font = "230px Changa one";
          ctx.fillText("GAME OVER!", 25, Math.floor(MAX_HEIGHT / 2) * box);
          dead.play();
      } else if (key === "ArrowUp" && dir !== "down") {
          dir = "up";
          up.play();
      } else if (key === "ArrowDown" && dir !== "up") {
          dir = "down";
          down.play();
      } else if (key === "ArrowLeft" && dir !== "right") {
          dir = "left";
          left.play();
      } else if (key === "ArrowRight" && dir !== "left") {
          dir = "right";
          right.play();
      }
  }
      document.addEventListener("keydown",this.fun);

    
    
  
    var game = setInterval(draw, 100);
    
   
  }

  componentWillUnmount(){
    document.removeEventListener('keydown',this.fun)
  }

  render(){


   
    return(

       <center><canvas ref={this.inputRef} id="snakeGameCanvas"></canvas></center> 
    );
  }

}

export default SnakeGame;