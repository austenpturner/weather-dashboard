import React, { Component } from 'react';
import './navstyles.css';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideNav: false
        };
    }

    handleNavSlide() {
        if (this.state.slideNav) {
            this.setState({ slideNav: false});
        } else {
            this.setState({ slideNav: true });
        }
    }

    render() {
        return (
            <nav>
                <div id='nav-bar'>
                    <button  
                        id='search-btn'
                        onClick={this.props.displaySearchBar}
                    >
                        <i 
                            className='fas fa-search fa-lg'
                        ></i>
                    </button>
                    <button 
                        id='save-btn'
                        // onClick={this.props.handleLocationSave}
                    >
                        <i className='far fa-bookmark fa-lg'></i>
                    </button>
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
                </div>
                <div 
                    id='nav-slider'
                    className={this.state.slideNav ? "slide-in" : "slide-out"}
                >
                    <ul 
                        id='saved-list' 
                    >
                        {/* <li>
                            <a 
                                className='saved-place' 
                                href='#about'
                                onClick={this.props.handleNavSlide}
                            >
                                About
                            </a>
                        </li> */}
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Nav;