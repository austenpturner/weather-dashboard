import React, { Component } from "react";
import "./weatherstyles.css";

const renderConditionIcon = description => {
    let iconClass = "";
    if (description === 'Clouds' || description === 'Fog') {
        iconClass = 'fas fa-cloud fa-6x';
    } else if (description === 'Rain' || description === 'Drizzle' || description === 'Mist') {
        iconClass = 'fas fa-cloud-rain fa-6x';
    } else if (description === 'Snow') {
        iconClass = 'far fa-snowflake fa-6x';
    } else if (description === 'Thunderstorm') {
        iconClass = 'fas fa-bolt fa-6x';
    } else if (description === 'Clear') {
        iconClass = 'fas fa-sun fa-6x';
    } else if (description === 'Smoke' || description === 'Haze' || description === 'Ash' || description === 'Dust' || description === 'Sand') {
        iconClass = 'fas fa-smog fa-6x';
    } else if (description === 'Squall' || description === 'Tornado') {
        iconClass = 'fas fa-cloud fa-6x';
    }
    return iconClass; 
};

class WeatherContainer extends Component {
    render() {
        const currentWeather = this.props.currentWeather;
        // console.log(currentWeather);
        const iconClass = renderConditionIcon(currentWeather.description);
        return (
            <div id="weather-container">
                <p id="date">{this.props.date}</p>
                <div id="weather-data">
                    <div className="col">
                        <h4>{this.props.location}</h4>
                        <p>Humidity: {currentWeather.humidity}%</p>
                        <p>Wind Speed: {currentWeather.windSpeed}mph</p>
                        <p>UV Index: {currentWeather.uvIndex}</p>
                    </div>
                    <div className="col">
                        <p id="temp">{currentWeather.temp}&deg;F</p>
                        <i className={iconClass}></i>
                    </div>
                </div>
            </div>
        );
    }
}

export default WeatherContainer;