import Home from './home/home';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';



import SnakeGame from './games/snakeGame/snakeGame';
import {  BrowserRouter , Route,  Switch } from 'react-router-dom';


ReactDOM.render(
  <BrowserRouter>
  <Switch>
          <Route path="/game">
            <SnakeGame />
          </Route>
         
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
     
    </BrowserRouter>,
 
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
