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

   //score 
   score  = 0;
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
   box = 32;

   //position of food
   food;

   //redraw game each second
   game;

 xDown = null;                                                        
 yDown = null;

   constructor(c){
     this.canvas = c;
      
       this.foodImg.src =  res.foodImage;
       this.dead.src = res.deadSound;
       this.eat.src = res.eatSound;
       this.up.src = res.upSound;
       this.down.src = res.downSound;
       this.right.src = res.rightSound;
       this.left.src = res.leftSound;

      

       this.setupBoard();
      
   }

   //some setups of board 
   setupBoard(){
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = Math.floor(window.innerWidth/ 32) * 32 - 32;
    this.canvas.height = Math.floor(window.innerHeight / 32) * 32;


    this.MAX_HEIGHT  = this.canvas.height / 32;
    this.MAX_WIDTH  = this.canvas.width / 32;

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
        for (let i = 32; i < this.MAX_WIDTH * this.box; i += 32) {
            this.ctx.moveTo(i, this.MAX_HEIGHT * this.box);
            this.ctx.lineTo(i, 0);
        }
        for (let  i = 32; i <this.MAX_HEIGHT * this.box; i += 32) {
            this.ctx.moveTo(0, i);
            this.ctx.lineTo(this.MAX_WIDTH * this.box, i);
        }
    
    
        this.ctx.strokeStyle = "gray";
        this.ctx.stroke();
    }



   //draw position of food and snake in board
   draww() {
   
    this.canvas.width = Math.floor(window.innerWidth / 32) * 32 - 32;
    this.canvas.height = Math.floor(window.innerHeight / 32) * 32;
    this.drawBoard();

    for (var i = 0; i < this.snake.length; i++) {
        this.ctx.fillStyle = (i === 0) ? "#33ff00" : "#66cc33";
        this.ctx.fillRect(this.snake[i].x, this.snake[i].y, this.box, this.box);

        this.ctx.strokeStyle = "black";
        this.ctx.strokeRect(this.snake[i].x, this.snake[i].y, this.box, this.box);
    }

    
    this.ctx.drawImage(this.foodImg, this.food.x, this.food.y);

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

    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Changa one";
    this.ctx.fillText("SCORE: " + this.score, 2 * this.box, 1.6 * this.box);


  
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


getTouches(evt) {
    return evt.touches ||             // browser API
           evt.originalEvent.touches; // jQuery
  } 
 handleTouchStart(evt) {
    const firstTouch = this.getTouches(evt)[0];                                      
    this.xDown = firstTouch.clientX;                                      
    this.yDown = firstTouch.clientY;                                      
}; 
//this will listen to gesture event (if game is being played in mobiles)
gestureHandler(evt) {
    if ( ! this.xDown || ! this.yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = this.xDown - xUp;
    var yDiff = this.yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */ 
            console.log("left swipe")
            if(this.dir !== "right"){
                this.dir = "left";
                this.left.play();
            }
        } else {
            /* right swipe */
            if(this.dir !== "left"){
                this.dir = "right";
                this.right.play();
            }
            console.log("right swipe")
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */ 
            if(this.dir !== "down"){
                this.dir = "up";
                this.up.play();
            }
            
        } else { 
            /* down swipe */
            if(this.dir !== "up"){
                this.dir = "down";
                 this.down.play();
            }
            console.log("down swipe")
        }                                                                 
    }
    /* reset values */
    this.xDown = null;
    this.yDown = null;                                             
};
}

export default GameLogic;