//this component will render a text based on user's auth state
import React from 'react';
import AuthService from '../../serivces/auth';
import firebase from "firebase/app";
 import './authState.css'
 import Avatar from '@material-ui/core/Avatar';

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
return (<p>  <Avatar id="profilePic" alt="Remy Sharp" src={this.state.userData.photoURL}/> {this.state.userData.displayName}</p>)
      } else{
return( <p onClick={AuthService.signIn}>Login</p>)
      }
      
        
    }

}

export default AuthStateUI;