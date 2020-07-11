import React, { Component } from "react";
import "./headerstyles.css";

class Header extends Component {
    render() {
        return (
            <div id="header">
                {/* <h1>Weather Dashboard</h1> */}
                <p id="date">{this.props.date}</p>
            </div>
        );
    }
}

export default Header;