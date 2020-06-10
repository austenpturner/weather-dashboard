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

    handleNavSlide() {
        // const targetId = event.target.id;
        if (this.state.slideNav) {
            this.setState({ slideNav: false});
        } else {
            this.setState({ slideNav: true });
        }
    }

    render() {
        return (
            <div id="header">
                <h1>Weather Dashboard</h1>
                <div 
                    id='nav-icon' 
                    onClick={this.handleNavSlide.bind(this)}
                >
                    <div 
                        className={this.state.slideNav ? "line toggle1" : "line"} 
                        id='line1'
                    ></div>
                    <div 
                        className={this.state.slideNav ? "line toggle2" : "line"} 
                        id='line2'
                    ></div>
                    <div 
                        className={this.state.slideNav ? "line toggle3" : "line"} 
                        id='line3'
                    ></div>
                </div>
                <Nav 
                    handleNavSlide={this.handleNavSlide.bind(this)} 
                    slideNav={this.state.slideNav}
                />
            </div>
        );
    }
}

export default Header;