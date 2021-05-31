import Home from './home/home';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
// import NavBar from './components/navbar/navbar';


import SnakeGame from './games/snakeGame/level1/snakeGamelevel1';
import {  BrowserRouter , Route,  Switch } from 'react-router-dom';
// import ProfilePage from './profile/profile';
import * as serviceWorker from './serviceWorkerRegistration';

import NavBarPro from './components/navbarPro/navbarPro.js';
import ProfilePagePro from './profilePagePro/profilePage.js';
import CoronaGoGame from 'games/coronaGoGame/coronaGo/coronaGo.js';
ReactDOM.render(

     
  <BrowserRouter>

  <Switch>
  <Route  exact path ="/profile" >
  <NavBarPro/>
         {/* <ProfilePage></ProfilePage> */}
         <ProfilePagePro />

           </Route>
  <Route exact path="/" >
  <NavBarPro/>
    <Home/>
    </Route>
    <Route path="/games/coronaGoGame" component = {CoronaGoGame} />
          <Route path="/games/snakeGame/level1" component = {SnakeGame} />
           
      
       <Route path="*">
         <Home></Home>
       </Route>
        </Switch>
     
    </BrowserRouter>
  
    ,
 
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorker.register();