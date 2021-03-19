import React from 'react';
import { Navbar } from 'react-bootstrap';


//footer component


class Footer extends React.Component{

    render(){
        return (

           
            
    
          <Navbar bg="light" fixed="bottom" style={{marginTop:50+'px'}}>
            <Navbar.Brand href="#home">Brand link</Navbar.Brand>
          </Navbar>
         
    
        );
    }
}


export default Footer;