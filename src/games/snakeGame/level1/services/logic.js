import { handleTouchStart,globalGestureHandler } from 'serivces/touchEvents';


import  * as res from './resources';


//this is a class containing main logic of different action of game
//it will have some static methods
class GameLogic{
    
  //loading images and audio files
   foodImg = new Image();
   dead = new Audio();
   eat = new Audio();
   up = new Audio();
   down = new Audio();
   right = new Audio();
   left = new Audio();

   
   //direction of snake 
     dir;

    //position of snake as x and y cordinate
    snake = [];

    //canvas in which game and board willl be drawn
    canvas;

   //context of canvas
   ctx;

   //max height and width of board
   MAX_HEIGHT;
   MAX_WIDTH;

//total cells in box
   box;

   //position of food
   food;

   //redraw game each second
   game;


 

 //device type
 //possible value (1 => for desktop, 2 => for mobile)
 //game UI willl be different for both type of devices
 deviceType;
   constructor(c, deviceType, gameRef){
     this.canvas = c;
      
       this.foodImg.src =  res.foodImage;
       this.dead.src = res.deadSound;
       this.eat.src = res.eatSound;
       this.up.src = res.upSound;
       this.down.src = res.downSound;
       this.right.src = res.rightSound;
       this.left.src = res.leftSound;
       this.touchCordinates = null;
      this.deviceType = deviceType;
      this.score = 0;
      //this hold ref to snakeGame class
      //so that updateScore call can be made
      this.gameRef  = gameRef;

      if(this.deviceType === 1){
          this.box = 32;
      }else{
          this.box = 20;
      }

       this.setupBoard();
      
   }

   //some setups of board 
   setupBoard(){
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = Math.floor(window.innerWidth/ this.box) * this.box - this.box;
    this.canvas.height = Math.floor(window.innerHeight / this.box) * this.box;


    this.MAX_HEIGHT  = this.canvas.height / this.box;
    this.MAX_WIDTH  = this.canvas.width / this.box;

    this.snake[0] = {
        x: Math.floor(this.MAX_WIDTH / 2) * this.box,
        y: Math.floor(this.MAX_HEIGHT / 2) * this.box
    };

       //create the food
     this.food = {
        x: Math.floor(Math.random() * (this.MAX_WIDTH)) * this.box,
        y: Math.floor(Math.random() * (this.MAX_HEIGHT)) * this.box
    };
     
   

  
    
   }


   //this method will be called for start playing the game
  play(){
    this.game = setInterval(() => {
        this.draww();
    }, 100); 
    
   }


   //restart the game
   restart(){
      document.location.reload();

   }


   //this will be called if user quit the game or loss the game
   gameOver(){
    clearInterval(this.game);
    this.ctx.fillStyle = "red";
    this.ctx.font = "50px Changa one";
    this.ctx.fillText("GAME OVER!", 25, Math.floor(this.MAX_HEIGHT / 2) * this.box);
    this.dead.play();
   }

    //draw board the method
    drawBoard() {
        for (let i = this.box; i < this.MAX_WIDTH * this.box; i += this.box) {
            this.ctx.moveTo(i, this.MAX_HEIGHT * this.box);
            this.ctx.lineTo(i, 0);
        }
        for (let  i = this.box; i <this.MAX_HEIGHT * this.box; i += this.box) {
            this.ctx.moveTo(0, i);
            this.ctx.lineTo(this.MAX_WIDTH * this.box, i);
        }
    
    
        this.ctx.strokeStyle = "gray";
        this.ctx.stroke();
    }



   //draw position of food and snake in board
   draww() {
   
    this.canvas.width = Math.floor(window.innerWidth / this.box) * this.box - this.box;
    this.canvas.height = Math.floor(window.innerHeight / this.box) * this.box;
    this.drawBoard();

    for (var i = 0; i < this.snake.length; i++) {
        this.ctx.fillStyle = (i === 0) ? "#33ff00" : "#66cc33";
        this.ctx.fillRect(this.snake[i].x, this.snake[i].y, this.box, this.box);

        this.ctx.strokeStyle = "black";
        this.ctx.strokeRect(this.snake[i].x, this.snake[i].y, this.box, this.box);
    }

    
    this.ctx.drawImage(this.foodImg, this.food.x, this.food.y,this.box,this.box);

    var snakeX = this.snake[0].x;
    var snakeY = this.snake[0].y;
    if (this.dir === "up") snakeY -= this.box;
    else if (this.dir === "down") snakeY += this.box;
    else if (this.dir === "right") snakeX += this.box;
    else if (this.dir === "left") snakeX -= this.box;


    if (snakeX === this.food.x && snakeY === this.food.y) {
        if(this.score===0){
            this.score++;
        }
        else if(this.score%10===0){
            this.score+=101;
        }else{
            this.score++;
        }

        this.gameRef.updateScore(this.score)
        this.eat.play();
        this.food = {
            x: Math.floor(Math.random() * (this.MAX_WIDTH)) * this.box,
            y: Math.floor(Math.random() * (this.MAX_HEIGHT)) * this.box
        };
    } else {
        this.snake.pop();
    }

    if (snakeX < 0 || snakeX >= this.MAX_WIDTH *this.box || snakeY < 0 || snakeY >= this.MAX_HEIGHT * this.box) {
        this.gameOver();
    }
    for (let  i = 0; i < this.snake.length; i++) {
        if ((this.snake[i].x === snakeX && this.snake[i].y === snakeY)) {
           this.gameOver();
        }
    }
    var newHead = {
        x: snakeX,
        y: snakeY
    };
    this.snake.unshift(newHead);

   


  
}


 direction(x) {
    var key = x.code;
    

if(key === "KeyR"){
    
    this.restart();
}

    if (key === "Escape") {
        this.gameOver();
    } else if (key === "ArrowUp" && this.dir !== "down") {
        this.dir = "up";
        this.up.play();
    } else if (key === "ArrowDown" && this.dir !== "up") {
        this.dir = "down";
        this.down.play();
    } else if (key === "ArrowLeft" && this.dir !== "right") {
        this.dir = "left";
        this.left.play();
    } else if (key === "ArrowRight" && this.dir !== "left") {
        this.dir = "right";
        this.right.play();
    }
}

/**
 * 
 * method to pause the game
 */
pauseGame(){
    clearInterval(this.game);
    this.gameRef.updateGameState("paused");
}

resumeGame(){
    this.gameRef.updateGameState("playing");
    this.play();
   
}


//first register this function with "touchStart" event 
//that way we will have starting point of touch
//then register "touchMove" event it will give last position of touch movement
//that way start and end position calculation will give us direction of gesture

 handleTouch(evt) {
     this.touchCordinates  =  handleTouchStart(evt);                                  
                           
}; 
/** 
this will listen to gesture event (if game is being played in mobiles)
*/
gestureHandler(evt) {
    
  var gestureCode = globalGestureHandler(evt, this.touchCordinates);

    
   switch(gestureCode){
       case 1:
        if(this.dir !== "right"){
            this.dir = "left";
         
            this.left.play();
          
           
        }
           break;
        case 2:
            if(this.dir !== "left"){
                this.dir = "right";
                
                this.right.play();
              
            }
            break;
        case 3:
            if(this.dir !== "up"){
                this.dir = "down";
               
                this.up.play();
              
            }
            break;
        case 4 :
            if(this.dir !== "down"){
                this.dir = "up";
               
                  this.down.play();
                
            }
            break;
        default:
            break;
   }
  
                                           
};
}

export default GameLogic;