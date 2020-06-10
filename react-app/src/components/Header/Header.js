import React, { Component } from "react";
import Nav from "./Nav";
import "./headerstyles.css";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideNav: false
        };
    }

    render() {
        return (
            <div id="header">
                <h1>Weather Dashboard</h1>
                <Nav />
            </div>
        );
    }
}

export default Header;