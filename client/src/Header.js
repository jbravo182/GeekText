import React, {Component} from "react";
import { Button } from "@material-ui/core";
import { NavLink, HashRouter } from "react-router-dom";
import SearchArea from "./SearchArea";
import Dropdown from 'react-bootstrap/Dropdown';

class Header extends Component {

    constructor (props) {
        super (props);
        this.state = {
            anchorEl: null,
            currentUser: props.currentUser,
            isUserLoggedIn: props.isUserLoggedIn
        }

        this.logoutCurrentUser = this.logoutCurrentUser.bind(this);
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps !== this.props) {
            this.setState({
                currentUser: nextProps.username, 
                isUserLoggedIn: nextProps.isUserLoggedIn
            })
        }
    }
    
    render () {
        return (
            <HashRouter>
            <div className="topnav">
                <div className="logo">
                <NavLink style={{ textDecoration: 'none',  color: 'black'}} 
                                    to="/HomePage">
                    <h1 align = "left">Geek Text</h1>
                    </NavLink>
                </div>
                <div id="search-info-container" className="search">
                <SearchArea></SearchArea>
                </div>
                <div className="rightIcons">
                    <div className="divider"></div>
                    <div className="loginButton">
                        {this.loggedInUser()}
                    </div>
                </div>
            </div>
            </HashRouter>
        )
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleLogout = () => {
        this.logoutCurrentUser();
        alert("You have been logged out");
        
    };

    logoutCurrentUser() {
        this.props.logoutUser("null", false);
    }

    loggedInUser () {

        const { anchorEl } = this.state;

        if (this.state.isUserLoggedIn) {
            return (
                <HashRouter>
                    <div>
                        <Dropdown>
                            <Button
                            disabled
                            style={{textDecoration: 'none', color: 'black', textTransform: 'none'}}
                            aria-owns={anchorEl ? 'simple-menu' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleClick}>
                            {this.props.currentUser}
                            </Button>
                            <Dropdown.Toggle split className="menuToggle"></Dropdown.Toggle>

                            <Dropdown.Menu alignRight>
                                <Dropdown.Item>
                                    <NavLink style={{ textDecoration: 'none',  color: 'black'}} 
                                        to="/profilesettings"
                                        >Your Account</NavLink>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <NavLink style={{ textDecoration: 'none',  color: 'black'}} 
                                        to="/loginSettings"
                                        >Your Login Settings</NavLink>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <NavLink style={{ textDecoration: 'none',  color: 'black'}} 
                                        to="/addressSettings"
                                        >Your Addresses</NavLink>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <NavLink style={{ textDecoration: 'none',  color: 'black'}} 
                                    to="/paymentSettings"
                                    >Your Payment Methods</NavLink>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <NavLink style={{ textDecoration: 'none',  color: 'black'}} 
                                        to="/"
                                        onClick={this.handleLogout}
                                        >Sign Out</NavLink>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                            </Dropdown>
                    </div>
                </HashRouter>
            )
        } else {
            return (
                <div>
                    <NavLink style={{ textDecoration: 'none',  color: 'black'}} 
                                to="/Profile"
                                >Login / Register</NavLink>
                    <NavLink style={{ textDecoration: 'none',  color: 'black'}} 
                                to="/ShoppingCart"
                                >Shopping Cart</NavLink>
                </div>
            )
        }
    }
}

export default Header;