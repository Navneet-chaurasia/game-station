/***
 * This is main starting point of Corona game
 * Here we will render CoronaGoGame as a component
 */

import React from 'react';
import '../css/coronaGo.css';
import { setDeviceOrientation } from 'serivces/getDeviceType';
import { Navbar, Nav, } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import { BulletsArray, Corona, Space } from './objects.js';

class CoronaGoGame extends React.Component {


    constructor() {

        super();
        this.ctx = null;
        this.canvas = null;
        this.bulletArray = null;
        this.earth = null;
        this.timeout = null;
        this.space = null;
        this.coronas = [];
        this.earth = null;
        this.state = {
            score: 0,
            life: 100,
            /**
             * game state 1 => playing
             *            0 => paused
             *            -1=> gameOver
             */
            gameState: 1
        }

    }
    //init method it will do some starting procedures
    init() {

        this.setState({
            score: 0,
            gameState: 0
        })


        let canvas = document.createElement("canvas");
        canvas.id = "coronaGoCanvas";

        let coronaGoGame = document.getElementById("coronaGoGame");
        let startUpBox = document.getElementById("startBox");

        

        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
        this.bulletArray = new BulletsArray(this.ctx, 4, 4, this.canvas.height, this.canvas.width);
        this.space = new Space(this.ctx, this.canvas.height, this.canvas.width);
        this.earth = this.space.earth;
 
        window.addEventListener("click", (e) => {
            let bulletOriginX = this.canvas.width / 2;
            let bulletOriginY = this.canvas.height / 2;
            let speed = this.calculateSpeed(e.clientX, e.clientY, bulletOriginX, bulletOriginY)
            this.bulletArray.addBullet(bulletOriginX, bulletOriginY, speed)

        })
   
        //setup the canvas
           if(startUpBox != null)
        coronaGoGame.replaceChild(canvas, startUpBox);
           
        this.createCorona();

        //start the game
        this.startGame();

    }


    /**
     * it will pause resume accordingly
     */
    toggleGameState() {
        if (this.state.gameState === -1) {
            this.restartGame()
            return;
        } else if (this.state.gameState === 0) {

            this.setState({
                gameState: 1
            })
            this.startGame();
        } else {
            this.setState({
                gameState: 0
            })
            clearInterval(this.timeout)
        }
    }

    restartGame() {
        document.location.reload();
    }

    startGame() {
        this.timeout = setInterval(() => {
            this.drawGame();

        }, 10);
    }

    drawGame() {


        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        //draw space
        this.space.draw();



        this.bulletArray.drawBullets();


        //drawing coronas
        for (let i = 0; i < this.coronas.length; i++) {
            let c = this.coronas[i]
            c.draw();

            if (this.earth.isCollidedWithCorona(c)) {
                this.coronas.splice(i, 1)
                this.setState((prev) => ({
                    life: prev.life - 25

                }))
                if (this.state.life === 0) {
                    clearInterval(this.timeout)
                    this.setState({
                        gameState: -1
                    })
                }

            }
            if (this.bulletArray.isCollidedWithCorona(c)) {
                //remove this corona
                this.coronas.splice(i, 1)

                this.setState({ score: this.state.score + 5 }
                );

            }
        }
        //make earth object

    }

    /**this function return estimated speed x,y for a bullet */
    calculateSpeed(dx, dy, ox, oy) {
        let angle = Math.atan2(dy - oy, dx - ox)
        let sx = Math.cos(angle);
        let sy = Math.sin(angle);

        return { x: sx, y: sy }
    }

    createCorona() {
        setInterval(() => {
            let delta = Math.random();
            let x;
            let y;
            if (delta < 0.5) {

                x = Math.random() < 0.5 ? 0 : this.canvas.width;
                y = Math.random() * this.canvas.height;
            } else {

                y = Math.random() < 0.5 ? 0 : this.canvas.height;
                x = Math.random() * this.canvas.width;
            }
            let speed = this.calculateSpeed(this.canvas.width / 2, this.canvas.height / 2, x, y)
            let newCorona = new Corona(x, y, 30, 30, speed, this.ctx);
            this.coronas.push(newCorona)
        }, 1000)
    }

    /**
     * this method will be called to update the position of all objects if window is resized
     */
    updateObjectDimensions(){
     //1. update canvas
     this.canvas.height = window.innerHeight;
     this.canvas.width = window.innerWidth;

     //2. bullet array
     this.bulletArray.canvasHeight = this.canvas.height
     this.bulletArray.canvasWidth = this.canvas.width

     //3. space
     this.space.height = this.canvas.height
     this.space.width = this.canvas.width;

     //4. earth
     this.earth.x = this.canvas.width/2-this.earth.width
     this.earth.y = this.canvas.height/2-this.earth.height
    
    }


    componentDidMount() {
        let startButton = document.querySelector(".start_button");
        
        startButton.addEventListener("click", (ev) => {
            ev.stopImmediatePropagation();
            setDeviceOrientation();
            this.init();
           })

        
        window.addEventListener("resize", ()=>{
            this.updateObjectDimensions();
        });

    }

    render() {

        return (<div id="coronaGoGame">

            <Navbar bg="transparent" fixed="top" >
                <Nav className="mr-auto">
                    <Button size="small"  ><p className="navButtons">Score :
                    {this.state.score}</p></Button>

                    <Button size="small" onClick={() => { this.toggleGameState() }}><p className="navButtons">{
                        this.state.gameState === 1 ? "Pause" : this.state.gameState === 0 ? "Play" : "GameOver : Restart"}</p></Button>

                    <Button size="small" ><p className="navButtons" id="fullScreen">Setttings</p>
                    </Button>

                </Nav>
            </Navbar>
            <div id="progressBar">
                <div className="meter animate">
                    <span style={{ width: this.state.life + "%" }}><span></span></span>
                </div>
            </div>

            <div className="box" id="startBox">
                <div className="box_title"> Asteroid</div>
                <button className="start_button"> START GAME</button>
            </div>
        </div>
        )
    }
}


export default CoronaGoGame;