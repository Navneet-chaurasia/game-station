/***
 * This is main starting point of Corona game
 * Here we will render CoronaGoGame as a component
 */

import React from 'react';
import '../css/coronaGo.css';

import spaceImage from '../assets/space3.png';
import coronaImage from '../assets/coronaImage.png';
import {Earth} from './objects.js';
class CoronaGoGame extends React.Component{


    constructor(){

        super();
        this.ctx = null;
        this.canvas = null;
       
    }
    //init method it will do some starting procedures
    init(){
        let startButton = document.querySelector(".start_button");
        startButton.addEventListener("click", ()=>{
            //create a canvas element
            let canvas = document.createElement("canvas");
            canvas.id = "coronaGoCanvas";
            
            let coronaGoGame = document.getElementById("coronaGoGame");
            let startUpBox = document.getElementById("startBox");
            coronaGoGame.replaceChild(canvas,startUpBox);
            //setup the canvas
            this.canvas = canvas;
            this.ctx = canvas.getContext("2d")
            
            this.startGame();
        })
    }

    startGame(){

        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;

        //loading resources
        let space = new Image(this.canvas.height, this.canvas.width);
      
        let corona = new Image();
        space.src = spaceImage;
       
        corona.src = coronaImage;

        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
        //draw space
        space.onload = () => {
            this.ctx.drawImage(space, 0,0,this.canvas.width, this.canvas.height);
           
        }

        //make earth object
        let eHeight = 50;
        let eWidth = 50;
        let ePosX = this.canvas.width/2;
        let ePosY = this.canvas.height/2;
        
        let earth = new Earth(eHeight, eWidth, ePosX, ePosY,this.ctx);
        earth.draw();
        
    }

    componentDidMount(){

        this.init();

    }

    render(){

        return (<div id="coronaGoGame">
          <div className="box" id="startBox">
              <div className="box_title"> Asteroid</div>
              <button className="start_button"> START GAME</button>
          </div>
        </div>
        )
    }
}


export default CoronaGoGame;