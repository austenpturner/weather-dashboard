import React, { Component } from "react";
import "./weatherstyles.css";

class WeatherContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentWeather: {}
        };
    }

    componentDidMount() {
        this.setState({ currentWeather: this.props.currentWeather });
    }

    render() {
        const currentWeather = this.props.currentWeather;
        console.log(currentWeather);
        return (
            <div id="weather-container">
                <p>{this.props.date}</p>
                <h4>{this.props.location}</h4>
                <p>{currentWeather.temp} &deg;F</p>
                <p>Humidity: {currentWeather.humidity} %</p>
                <p>Wind Speed: {currentWeather.windSpeed} mph</p>
                <p>UV Index: {currentWeather.uvIndex}</p>
            </div>
        );
    }
}

export default WeatherContainer;