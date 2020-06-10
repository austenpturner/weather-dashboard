import React, { Component } from 'react';

class Nav extends Component {
    render() {
        return (
            <nav  
                className={this.props.slideNav ? "slide-in" : "slide-out"}
            >
                <ul 
                    id='saved-list' 
                    className='slide-right'
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
            </nav>
        );
    }
}

export default Nav;