/***
 * this file contains some objects used in coronaGo game
 */

/**
 * This is a planer Object it will render earth on scree
 * 
 */
 import earthImage from '../assets/earth.png';

class Earth{
    constructor(height, width,x,y, ctx){

        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.ctx = ctx;
    }

    draw(){

        let earth = new Image();
        earth.src = earthImage;
        earth.onload = () => {
            this.ctx.drawImage(earth, this.x,this.y,this.width, this.height);
        }
    }
}

export {Earth}