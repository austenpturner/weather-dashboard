import React, { Component } from "react";
import renderConditionIcon from "../../../utils/renderIcons";
import "./weatherstyles.css";

class WeatherContainer extends Component {
    render() {
        const currentWeather = this.props.currentWeather;
        const iconClass = renderConditionIcon(currentWeather.description);
        return (
            <div id="weather-container">
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