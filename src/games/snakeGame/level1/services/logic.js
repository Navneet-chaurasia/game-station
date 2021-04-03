import { BoardLevel1 } from 'games/snakeGame/Objects/board-level1';
import { FoodLevel1 } from 'games/snakeGame/Objects/food';
import { SnakeLevel1 } from 'games/snakeGame/Objects/snakeObject';
import { handleTouchStart, globalGestureHandler } from 'serivces/touchEvents';

import * as res from './resources';

/**
this is a class containing main logic of different action of snake game

 */
class GameLogic {

    //loading images and audio files
    foodImg = new Image();
    dead = new Audio();
    eat = new Audio();
    up = new Audio();
    down = new Audio();
    right = new Audio();
    left = new Audio();

    //score 
    score = 0;
    //direction of snake 
    dir;

    //canvas in which game and board willl be drawn
    canvas;

    //context of canvas
    ctx;

    //max height and width of board
    MAX_HEIGHT;
    MAX_WIDTH;

    //total cells in box
    box;



    //redraw game each second
    game;

    //device type
    //possible value (1 => for desktop, 2 => for mobile)
    //game UI willl be different for both type of devices
    deviceType;
    constructor(c, deviceType, gameRef) {
        this.canvas = c;

        this.foodImg.src = res.foodImage;
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
        this.gameRef = gameRef;

        //is game paused
        this.gamePlaying = true;

        if (this.deviceType === 1) {
            this.box = 32;
        } else {
            this.box = 20;
        }

        this.setupBoard();

    }


    /**
     * it will create a board object and will draw the board
     */
    setupBoard() {
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = Math.floor(window.innerWidth / this.box) * this.box - this.box;
        this.canvas.height = Math.floor(window.innerHeight / this.box) * this.box;


        this.MAX_HEIGHT = this.canvas.height / this.box;
        this.MAX_WIDTH = this.canvas.width / this.box;

        //create board object 
        this.board = new BoardLevel1(this.ctx, this.MAX_HEIGHT, this.MAX_WIDTH, "black", this.box);


        //create first snake cell with position in middle of the board
        this.snake = new SnakeLevel1(this.ctx, this.box, this.MAX_HEIGHT, this.MAX_WIDTH);
        //create mouth cell
        this.snake.createMouth();


        //create the food
        this.food = new FoodLevel1(this.ctx, this.box, this.box,
            Math.floor(Math.random() * (this.MAX_WIDTH)) * this.box,
            Math.floor(Math.random() * (this.MAX_HEIGHT)) * this.box,
            this.foodImg
        )

    }


    //this method will be called for start playing the game
    play() {
        this.game = setInterval(() => {
            this.draww();
        }, 100);

    }


    //restart the game
    restart() {
        document.location.reload();

    }


    //this will be called if user quit the game or loss the game
    gameOver() {
        clearInterval(this.game);
        this.ctx.fillStyle = "red";
        this.ctx.font = "50px Changa one";
        this.ctx.fillText("GAME OVER!", 25, Math.floor(this.MAX_HEIGHT / 2) * this.box);
        this.dead.play();
    }



    //draw position of food and snake in board
    draww() {

        this.canvas.width = Math.floor(window.innerWidth / this.box) * this.box - this.box;
        this.canvas.height = Math.floor(window.innerHeight / this.box) * this.box;


           //draw the snake (each cell)
           this.snake.draw();

        //now draw the board
        this.board.draw();
        //draw the food
        this.food.draw();

        //update the position


     //update the position of mouth
 this.snake.updateMouhtPositon(this.dir);



        if (this.snake.isFoodEated(this.food)) {
            if (this.score === 0) {
                this.score++;
            }
            else if (this.score % 10 === 0) {
                this.score += 101;
            } else {
                this.score++;
            }
            this.gameRef.updateScore(this.score)

            this.eat.play();

            //update the food position
            this.food.updateFoodPosition(this.board.width, this.board.height)
        } else {

            this.snake.pop();
        }


        //check if snake is collided with board or not
        if (this.snake.isCollidedWithBoard()) {

            this.gameOver();
        }
        //check if snake collided with itself or not
        if (this.snake.isCollidedWithItself()) {

            this.gameOver();
        }
        
        this.snake.addSnakeCell();


 


       

    }


    direction(x) {
        var key = x.code;


       

        if (this.gamePlaying) {
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

        if (key === "KeyR") {

            this.restart();
        }

        if (key === "Space") {
            if (this.gamePlaying === true) {

                this.pauseGame();
            } else {

                this.resumeGame();
            }

        }

    }

    /**
     * 
     * method to pause the game
     */
    pauseGame() {
        this.gamePlaying = false;
        clearInterval(this.game);
        this.gameRef.updateGameState("paused");
    }

    resumeGame() {
        this.gamePlaying = true;
        this.gameRef.updateGameState("playing");
        this.play();

    }



    //first register this function with "touchStart" event 
    //that way we will have starting point of touch
    //then register "touchMove" event it will give last position of touch movement
    //that way start and end position calculation will give us direction of gesture

    handleTouch(evt) {
        this.touchCordinates = handleTouchStart(evt);

    };
    /** 
    this will listen to gesture event (if game is being played in mobiles)
    */
    gestureHandler(evt) {

        var gestureCode = globalGestureHandler(evt, this.touchCordinates);




        if (this.gamePlaying) {
            switch (gestureCode) {
                case 1:
                    if (this.dir !== "right") {
                        this.dir = "left";

                        this.left.play();


                    }
                    break;
                case 2:
                    if (this.dir !== "left") {
                        this.dir = "right";

                        this.right.play();

                    }
                    break;
                case 3:
                    if (this.dir !== "up") {
                        this.dir = "down";

                        this.up.play();

                    }
                    break;
                case 4:
                    if (this.dir !== "down") {
                        this.dir = "up";

                        this.down.play();

                    }
                    break;
                default:
                    break;
            }
        }



    };
}

export default GameLogic;