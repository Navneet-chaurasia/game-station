/**
 * this is a board object specifically for level one
 * but it can be used in other levels also if needed
 * any other board objects should also be difined in this file only
 */



/**
 * board object for level one
 * 1. it will have some methods like
 *  1. draw board
 *  2. update board
 * 2. it will have some properties as well
 *  1. like size , color and all that
 */
class BoardLevel1{
    constructor(ctx, height, width ,color,box){
    this.ctx = ctx;
    this.height = height;
    this.width = width;
    this.color = color;
    //number of cells in the board
    //it will vary depend on device type
    this.box = box;
    }

/**
 * this will draw the board
 */
    draw(){
       
        for (let i = this.box; i < this.width * this.box; i += this.box) {
          
            this.ctx.moveTo(i, this.height * this.box);
            this.ctx.lineTo(i, 0);
        }
        for (let  i = this.box; i <this.height * this.box; i += this.box) {
            this.ctx.moveTo(0, i);
            this.ctx.lineTo(this.width * this.box, i);
        }
    
    
        this.ctx.strokeStyle = "gray";
        this.ctx.stroke();
    }
}

export {BoardLevel1};