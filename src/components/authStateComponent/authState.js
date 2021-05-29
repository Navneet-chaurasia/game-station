//this component will render a text based on user's auth state
import React from 'react';
import AuthService from '../../serivces/auth';
import firebase from "firebase/app";
 import './authState.css'
 import Avatar from '@material-ui/core/Avatar';
 import { Link } from 'react-router-dom';
import UserData from 'serivces/globalData/globalUserData';
class AuthStateUI extends React.Component{

   isMounted;

    constructor(props){
        super(props);
     
        this.state = {isLoggedIn : false, userData:null, isMounted:true};

        //setup listeners 

        firebase.auth().onAuthStateChanged(user => {

            if(user){

               this.setState({
                isLoggedIn : true,
                userData : user
               })
                
               
             //initilize usedata
             UserData.initializeUserData(user);
               
           }else{
       
            this.setState({
                isLoggedIn : false,
                userData : user
               })
            
           }
           
           }
        )

    }

    componentWillUnmount(){
        this.setState({
           isMounted :false
        })
  
    }

    render(){
       if(this.state.isLoggedIn){
return (<Link to="/profile" > <Avatar id="profilePic" alt="Remy Sharp" src={this.state.userData.photoURL}/> {this.state.userData.displayName}</Link> )
      } else{
return( <a href="#0"><p style={{color:"white"}} onClick={AuthService.signIn}>Login</p></a>)
      }
      
        
    }

}

export default AuthStateUI;