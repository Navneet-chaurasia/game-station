/**
 * 
 * this file will contain all objects necessary to construct snake for all levels
 */




/**
 * this is a basic building block of snake 
 * a snake Cell
 * it will have some properties
 * 1. height, width, color, positions
 * 2. some methods such as draw , update position and so on
 */
class SnakeCell {

    constructor(ctx, height, width, xPos, yPos, color) {

        this.ctx = ctx;
        this.height = height;
        this.width = width;
        this.xPos = xPos;
        this.yPos = yPos;
        this.color = color;

        //mouth x and y positions
        this.mouthX = null;
        this.mouthY = null;
    }

    /**
     * draw method to draw snake cell
     */
    draw() {

        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.xPos, this.yPos, this.height, this.width);

        this.ctx.strokeStyle = "black";
        this.ctx.strokeRect(this.xPos, this.yPos, this.height, this.width);
    }



}

/**
 * SNake class for level 1 it will hold all cells
 * it will have an array of snakeCells
 * some methods to draw, update etc
 */

class SnakeLevel1 {
    constructor(ctx, box, boardHeight, boardWidth) {
        this.ctx = ctx;
        //height and width of each cell that 
        this.box = box;
        //board total height
        this.boardHeight = boardHeight;
        //board total width
        this.boardWidth = boardWidth;
        //initially empty array of snakeCells
        this.snakeCellArray = [];
    }

    /**
     * this will draw and redraw all cells
     */
    draw() {
        for (let i = 0; i < this.snakeCellArray.length; i++) {

            //draw each cell
            this.snakeCellArray[i].draw();
        }
    }

    /**
     * speacial method to create initial snake cell (that is mouth)
     */

    createMouth() {
       
        const mouth = new SnakeCell(this.ctx, this.box, this.box,
            Math.floor(this.boardWidth / 2) * this.box,
            Math.floor(this.boardHeight / 2) * this.box,
            "red"
        );
     this.mouthX = mouth.xPos;
     this.mouthY = mouth.yPos
        this.snakeCellArray.unshift(mouth)
    }

    /**
     * add one more cell
     * @param currDirection
     */
    addSnakeCell() {
       
     

        const newCell = new SnakeCell(this.ctx, this.box,this.box,this.mouthX , this.mouthY,  "green");
        this.snakeCellArray.unshift(newCell)
    }

    /**
     * this method will pop cell from tell
     */
    pop(){
        this.snakeCellArray.pop();
    }


    /***
     * if snake eat the food
     * it will return true or false accordingly
     * @param currDirection
     * @param foodObject
     */
    isFoodEated(food){
       
        
        if (this.mouthX === food.xPos && this.mouthY === food.yPos) {
            return true;
        }
        else{
            return false;
        }

    }

   /**
    * this method will return true or false
    * if the snake is collided with board or not
    *
    * 
    */
   isCollidedWithBoard(){
   

    if (this.mouthX < 0 || this.mouthX >= this.boardWidth * this.box || this.mouthY < 0 || this.mouthY >= this.boardHeight * this.box) {
        return true;
    }else{
        return false;
    }
   }

   /**
    * method to change mouth positions
    * this method will be executed each time when user hit a key or swipe screen
    * @param currDirection
    */

   updateMouhtPositon(dir){
    if (dir === "up") this.mouthY -= this.box;
    else if (dir === "down") this.mouthY += this.box;
    else if (dir === "right") this.mouthX += this.box;
    else if (dir === "left") this.mouthX -= this.box;
   }

   /**
    * this method will check if snake is collided with itself or not
    * 
    */
   isCollidedWithItself(){
    
 

    for (let i = 0; i < this.snakeCellArray.length; i++) {
        if ((this.snakeCellArray[i].xPos === this.mouthX && this.snakeCellArray[i].yPos === this.mouthY)) {
           return true;
        }
    }

    return false;
   }
}



export { SnakeCell, SnakeLevel1 }