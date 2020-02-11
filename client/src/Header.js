import React, {Component} from "react";
import {
    NavLink,
    HashRouter
  } from "react-router-dom";
import SearchArea from "./SearchArea";

class Header extends Component {
    
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
                    </div>
                </div>
            </div>
            </HashRouter>
        )
    }
}

export default Header;