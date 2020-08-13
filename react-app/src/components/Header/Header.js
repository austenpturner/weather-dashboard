import React, { Component } from "react";
import "../dashboardstyles.css";

class Header extends Component {
    render() {
        return (
            <div id="header">
                <p id="date">{this.props.date}</p>
            </div>
        );
    }
}

export default Header;