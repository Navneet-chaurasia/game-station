//this component will render a text based on user's auth state
import React from 'react';
import AuthService from '../../serivces/auth';
import firebase from "firebase/app";
 import './authState.css'
 import Avatar from '@material-ui/core/Avatar';
 import { Link } from 'react-router-dom';
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
return (<Link to="/profile" style={{marginTop:7+"px", marginLeft:10+"px"}}> <Avatar id="profilePic" alt="Remy Sharp" src={this.state.userData.photoURL}/> {this.state.userData.displayName}</Link> )
      } else{
return( <Link style={{marginTop:7+"px", marginLeft:10+"px"}} onClick={AuthService.signIn}>Login</Link>)
      }
      
        
    }

}

export default AuthStateUI;