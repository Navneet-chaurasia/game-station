/***
 * this file contains some objects used in coronaGo game
 */

/**
 * This is a planer Object it will render earth on scree
 * 
 */

import earthImage from '../assets/earth.png';
import spaceImage from '../assets/space3.png';
import coronaImage from '../assets/coronaImage.png';
class Earth{
    constructor(height, width,x,y, ctx){

        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.ctx = ctx;
      
        this.image =  new Image();
    }

    draw(){

       
        this.image.src = earthImage;
        this.ctx.drawImage(this.image, this.x,this.y,this.width, this.height);
        
    }

    isCollidedWithCorona(corona){
        let l1 = this.x;
        let l2 = corona.x;
        let r1 = this.x + this.width/2;
        let r2 = corona.x + corona.width/2;
        let t1 = this.y + this.height;
        let t2 = corona.y + corona.height/2;
        let b1 = this.y;
        let b2 = corona.y;
 
        if(l1 < r2 && l2 < r1 && t1 > b2 && t2 > b1 ){
            return true
        }
        return false;
    }
}


/**
 * bullet object
 */
class Bullet{
    constructor(x,y,height,width,ctx,speed){
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.ctx = ctx;
        this.speed = speed;
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.fillStyle = "white"
        this.ctx.arc(this.x, this.y, this.height, 0,Math.PI*2,false)
        this.ctx.fill()
    }

    isCollidedWithCorona(corona){
      
    }
}


/**this is a bullets object it basically keep collection of bullets */

class BulletsArray{
    constructor(ctx, height, width, canvasHeight, canvasWidth){
        this.ctx = ctx;
      
        this.height = height;
        this.width = width;
        this.canvasHeight = canvasHeight;
        this.canvasWidth = canvasWidth
        this.bulletArray = [];
        this.particles = []
    }

    addBullet(x,y,speed){
        let bullet =  new Bullet(x, y, this.height,this.width,this.ctx,speed);
        this.bulletArray.push(bullet);
        console.log(this.bulletArray.length)
    }

    drawBullets(){
        for(let i = 0; i < this.bulletArray.length; i++){
            let b = this.bulletArray[i];
            b.draw();
            b.x += (b.speed.x*2)
            b.y += (b.speed.y*2)
            if(b.x < 0 || b.y < 0 || b.x >  this.canvasWidth || b.y > this.canvasHeight){
                this.bulletArray.splice(i,1);
                i = i-1;
            }
           
        }
   
    }

    isCollidedWithCorona(corona){
        for(let i = 0; i < this.bulletArray.length; i++){
            let b = this.bulletArray[i];
            let l1 = corona.x;
            let l2 = b.x;
            let r1 =corona.x + corona.width;
            let r2 = b.x + b.width;
            let t1 = corona.y + corona.height;
            let t2 = b.y + b.height;
            let b1 = corona.y;
            let b2 = b.y;
     
            if(l1 < r2 && l2 < r1 && t1 > b2 && t2 > b1 ){
                // setTimeout(()=>{
                //     for(let j = 0; j < b.width*2; j++){
                //         this.particles.push(new Particles(b.x,b.y,Math.random()*2, 
                //         {
                //             x: (Math.random()-0.5)*2,
                //             y: (Math.random()-0.5)*2
                //         },
                //         this.ctx
                //         ))
                //     }
                //     for(let k = 0; k < this.particles.length; k++){
    
                //         let p = this.particles[k];
                //         p.draw();
                //     }
                // },10)
               
                this.bulletArray.splice(i,1)
               
                return true;

            }
            
            
        }
        
        
        return false;
    }
}


/**
 * Space object
 */

class Space{
    constructor(ctx, height, width){
        this.ctx = ctx;
        
        this.height = height;
        this.width = width;
        
        this.image = new Image();
        this.earth = new Earth(100,100, this.width/2-50, this.height/2-50,this.ctx);
       
    }
    draw(){

        this.image.src = spaceImage;
        this.ctx.drawImage(this.image, 0,0,this.width, this.height);
        this.earth.draw();
    }

    
}

/***
 * Corona object
 */

class Corona{
    constructor(x,y,height, width,speed,ctx){
        this.image = new Image();
        this.image.src = coronaImage;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width
        this.speed = speed;
        this.ctx = ctx;
    }

    draw(){
        this.ctx.drawImage(this.image, this.x,this.y,this.width, this.height);
        this.x += (this.speed.x)
        this.y += (this.speed.y)
        
    }
}

/***
 * Particles object used when bullet collide with corona
 */
class Particles{
    constructor(x,y,radius, speed,ctx){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.ctx = ctx
    }

    draw(){

        this.ctx.beginPath();
        this.ctx.fillStyle = "white"
        this.ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        this.ctx.fill();
        this.x = this.x + this.speed.x;
        this.y = this.y + this.speed.y
    }
}



export {Earth, Bullet, BulletsArray, Space,Corona,Particles}