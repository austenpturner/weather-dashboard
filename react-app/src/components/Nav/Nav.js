import React, { Component } from 'react';
import localStorage from '../../utils/localStorage'
import weatherAPI from '../../utils/openWeatherAPI';
import './navstyles.css';

const renderLocations = () => {
    const savedLocations = localStorage.getLocalStorage();
    return savedLocations;
};

const renderLocationTemps = locations => {
    console.log(locations);
    for (let i = 0; i < locations.length; i++) {
        const location = locations[i];
        weatherAPI.searchCoordidateData(location)
                .then(res => {
                    const lat = res.data.latt;
                    const lon = res.data.longt;
                    console.log(location, ":", lat, lon);
                });
    };
};

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideNav: false,
            savedLocations: []
        };
    };

    componentDidMount() {
        this.setState({ savedLocations: renderLocations() });
    };

    handleNavSlide() {
        this.setState({ savedLocations: renderLocations() });
        // renderLocationTemps(this.state.savedLocations);

        if (this.state.slideNav) {
            this.setState({ slideNav: false});
        } else {
            this.setState({ slideNav: true });
        }
    };

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
                        onClick={this.props.handleLocationSave}
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
                        {this.state.savedLocations.map((location, index) => {
                            return <li
                                key={index}
                                className='location'
                                onClick={this.props.handleNavSlide}
                            >
                                <p>{location}</p>
                                {/* <p id="temp">&deg;F</p> */}
                            </li>
                        })}
                    </ul>
                </div>
            </nav>
        );
    };
};

export default Nav;