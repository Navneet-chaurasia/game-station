/**
 * this file will contain food object for all levels
 */


/**
 * food object for level one
 * it is a image actually
 * 1. this will have some fields such as height , width , and image
 * 2. and a draw method 
 * 3. and x , y cordinates
 */

class FoodLevel1{
    constructor(ctx, height, width, xPos, yPos, img){
        this.ctx = ctx;
        this.height = height;
        this.width = width;
        this.xPos = xPos;
        this.yPos = yPos;
        this.img = img;
    }

/**
 *  this will draw food on the canvas
 * */
    draw(){
        this.ctx.drawImage(this.img, this.xPos, this.yPos,this.height,this.width);
    }

    /**
     * this method will update the position of food randomly
     * also food position should be in limit 
     * of the board
     */
    updateFoodPosition(xLimit, yLimit){
        this.xPos = Math.floor(Math.random() * (xLimit)) * this.height;
        this.yPos = Math.floor(Math.random() * (yLimit)) *  this.width;
    }
}


export {FoodLevel1};