//this will render logout component

import AuthService from "../../serivces/auth";
import React from 'react';

class LogoutComponent extends React.Component{
         

    render(){
      return (<p onClick={AuthService.signOut}>Logout</p>)
    }
}

export default  LogoutComponent;