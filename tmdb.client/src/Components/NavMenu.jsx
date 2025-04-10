import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import {useAuth, useNavigateWrapper} from "@/AuthProvider.jsx";

class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor (props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar () {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
    
    logout () {
        this.props.auth.logOut()
        this.props.navigate('/');
    }

    render () {
        const loginComponent = this.props.auth.user ? <div><span style={{marginRight: 5}}>{this.props.auth.user}</span><a style={{cursor: 'pointer'}} onClick={e => this.logout()}>Logout</a></div> : <NavItem>
                <NavLink tag={Link} className="text-dark" to="/signin">Login</NavLink>
            </NavItem>;
        
        const registerComponent = this.props.auth.user ? null : <NavItem>
            <NavLink tag={Link} className="text-dark" to="/signup">Register</NavLink></NavItem>;
        
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container style={{display: 'flex'}}>
                        <NavbarBrand tag={Link} to="/">TMDB</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                {registerComponent}
                                {loginComponent}
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}

export default useNavigateWrapper(useAuth(NavMenu));