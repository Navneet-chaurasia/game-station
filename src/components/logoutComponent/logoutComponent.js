//this will render logout component

import AuthService from "../../serivces/auth";
import React from 'react';
import { Link } from 'react-router-dom';
class LogoutComponent extends React.Component{
         

    render(){
      return (<Link to='/' onClick={AuthService.signOut}>Logout</Link>)
    }
}

export default  LogoutComponent;