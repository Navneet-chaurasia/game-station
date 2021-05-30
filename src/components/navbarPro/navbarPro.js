/**
 * This component renders a responsive navbar for both mobile and desktop
 */
import React from 'react';
import './navbarPro.css';
import AuthStateUI from '../authStateComponent/authState';
import LogoutComponent from "../logoutComponent/logoutComponent";
import { Link } from 'react-router-dom';
class NavBarPro extends React.Component{

  componentDidMount(){
    //add even listeners for all of the menu button so that clicking on them will close the drawer
   let settings = document.getElementById("setting");
   settings.addEventListener("click", ()=>{
    let temp = document.getElementById("page-nav-toggle");
    temp.checked = false
    console.log(temp.checked)
   })

   let logo = document.getElementById("logo");
   logo.addEventListener("click", ()=>{
    let temp = document.getElementById("page-nav-toggle");
    temp.checked = false
    console.log(temp.checked)
   })

   let profile = document.getElementById("profile");
   profile.addEventListener("click", ()=>{
    let temp = document.getElementById("page-nav-toggle");
    temp.checked = false
    console.log(temp.checked)
   })

   let leaderboard = document.getElementById("leaderboard");
   leaderboard.addEventListener("click", ()=>{
    let temp = document.getElementById("page-nav-toggle");
    temp.checked = false
    console.log(temp.checked)
   })
  }

    render(){
        return (<><input id="page-nav-toggle"  className="main-navigation-toggle" type="checkbox" />
        <label htmlFor="page-nav-toggle">
          <svg className="icon--menu-toggle" viewBox="0 0 60 30">
            <g className="icon-group">
              <g className="icon--menu">
                <path d="M 6 0 L 54 0" />
                <path d="M 6 15 L 54 15" />
                <path d="M 6 30 L 54 30" />
              </g>
              <g className="icon--close">
                <path d="M 15 0 L 45 30" />
                <path d="M 15 30 L 45 0" />
              </g>
            </g>
          </svg>
        </label>
       
        <nav className="main-navigation">
          <p id="logo"><Link to="/">Game Station</Link></p>
          <ul>
        
            <li id="profile"><AuthStateUI ></AuthStateUI></li>
            <li><a href="#0" id="setting">Settings</a></li>
            <li><a href="#0" id="leaderboard">LeaderBpard</a></li>
            <li><LogoutComponent ></LogoutComponent> </li>
          </ul>
        </nav>
       
        </>);
    }
}

export default NavBarPro;