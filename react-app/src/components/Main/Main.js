import React, { Component } from 'react';
import WeatherContainer from "./WeatherContainer/WeatherContainer";
import HourlyContainer from "./HourlyContainer/HourlyContainer";
import ForecastContainer from "./ForecastContainer/ForecastContainer";
import './mainstyles.css';

class Main extends Component {
    render() {
        return (
            <div 
                id="main"
                className={this.props.showSearchBar ? 'veil' : ''}
            >
                <WeatherContainer 
                    currentWeather={this.props.currentWeather}
                    location={this.props.location}
                    date={this.props.date}
                />
                <HourlyContainer 
                    hourlyWeather={this.props.hourlyWeather}
                    location={this.props.location}
                />
                <ForecastContainer 
                    forecast={this.props.forecast}
                    date={this.props.date}
                />
            </div>
        );
    }
}

export default Main;