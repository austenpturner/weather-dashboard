import React, { Component } from 'react';
import localStorage from '../../utils/localStorage'
import weatherAPI from '../../utils/openWeatherAPI';
import utilFunctions from '../../utils/utilFunctions';
import renderConditionIcon from '../../utils/renderIcons';
import './navstyles.css';

const retrieveLocationInfo = () => {
    const locationInfo = localStorage.getLocalStorage();
    if (locationInfo !== undefined) {
        for (let i = 0; i < locationInfo.length; i++) {
            const location = locationInfo[i];
            const lat = location.lat;
            const lon = location.lon;
            weatherAPI.weatherData(lat, lon)
                    .then(res => {
                        const tempF = utilFunctions.convertToFahrenheit(res.data.current.temp);
                        location.temp = tempF;
                        const description = res.data.current.weather[0].main;
                        location.description = description;
                    });
        };
        return locationInfo;
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
        if (retrieveLocationInfo() !== undefined) {
            this.setState({ savedLocations: retrieveLocationInfo() });
        };
    };

    handleNavSlide() {
        if (this.state.slideNav) {
            this.setState({ slideNav: false});
        } else {
            this.setState({ slideNav: true });
        };
    };

    locationSelection(event) {
        this.handleNavSlide();
        this.props.handleLocationSelection(event);
    };

    render() {
        const locations = this.state.savedLocations;
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
                        {locations.map((location, index) => {
                            return <li
                                key={index}
                                className='location'
                                id={location.city}
                                onClick={this.locationSelection.bind(this)}
                            >
                                <p className='city'>{location.city}</p>
                                <i className={renderConditionIcon(location.description)}></i>
                                <p className='temp'>{location.temp}&deg;F</p>
                            </li>
                        })}
                    </ul>
                </div>
            </nav>
        );
    };
};

export default Nav;