import React from "react";
import { Button, Form, FormControl, Nav, Navbar, NavDropdown } from "react-bootstrap";
import AuthStateUI from '../authStateComponent/authState';
import LogoutComponent from "../logoutComponent/logoutComponent";

//home Navbar

class NavBar extends React.Component{
 
    render(){


     
     
        return (
            <Navbar bg="light" expand="lg" sticky="top" >
            <Navbar.Brand onClick={() => this.fun()}>{this.props.title}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#home">Leaderboard</Nav.Link>
                <Nav.Link href="#link">Top Games</Nav.Link>
                <NavDropdown title="Settings" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Setting 1</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Setting 2</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Setting 3</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <LogoutComponent></LogoutComponent> 
                </NavDropdown>

                <AuthStateUI></AuthStateUI>
              </Nav>
              <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>
        );
    }
}

export default NavBar;