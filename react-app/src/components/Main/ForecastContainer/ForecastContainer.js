import React, { Component } from 'react';
import Moment from "moment";
import "./forecaststyles.css";

const renderConditionIcon = description => {
    let iconClass = "";
    if (description === 'Clouds' || description === 'Fog') {
        iconClass = 'fas fa-cloud fa-3x';
    } else if (description === 'Rain' || description === 'Drizzle' || description === 'Mist') {
        iconClass = 'fas fa-cloud-rain fa-3x';
    } else if (description === 'Snow') {
        iconClass = 'far fa-snowflake fa-3x';
    } else if (description === 'Thunderstorm') {
        iconClass = 'fas fa-bolt fa-3x';
    } else if (description === 'Clear') {
        iconClass = 'fas fa-sun fa-3x';
    } else if (description === 'Smoke' || description === 'Haze' || description === 'Ash' || description === 'Dust' || description === 'Sand') {
        iconClass = 'fas fa-smog fa-3x';
    } else if (description === 'Squall' || description === 'Tornado') {
        iconClass = 'fas fa-cloud fa-3x';
    }
    return iconClass; 
};

class ForecastContainer extends Component {
    render() {
        const forecastData = this.props.forecast;
        return (
            <div id="forecast-container">
                {forecastData.map((day, index) => {
                    return <div 
                        key={index}
                        className="card"
                    >
                        <p id="day">{Moment().add(index + 1, 'days').format('dddd')}</p>
                        <p id="temp">{day.temp}&deg;F</p>
                        <i className={renderConditionIcon(day.description)}></i>
                        {/* <p id="wind-speed">Wind Speed: {day.windSpeed}mph</p> */}
                        {/* <p id="humidity">Humidity: {day.humidity}%</p> */}
                    </div>;
                })}
            </div>
        );
    }
}

export default ForecastContainer;