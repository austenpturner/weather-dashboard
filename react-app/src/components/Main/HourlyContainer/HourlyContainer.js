import React, { Component } from 'react';
import Moment from "moment";
import "./hourlystyles.css";

const renderConditionIcon = description => {
    let iconClass = "";
    if (description === 'Clouds' || description === 'Fog') {
        iconClass = 'fas fa-cloud fa-2x';
    } else if (description === 'Rain' || description === 'Drizzle' || description === 'Mist') {
        iconClass = 'fas fa-cloud-rain fa-2x';
    } else if (description === 'Snow') {
        iconClass = 'far fa-snowflake fa-2x';
    } else if (description === 'Thunderstorm') {
        iconClass = 'fas fa-bolt fa-2x';
    } else if (description === 'Clear') {
        iconClass = 'fas fa-sun fa-2x';
    } else if (description === 'Smoke' || description === 'Haze' || description === 'Ash' || description === 'Dust' || description === 'Sand') {
        iconClass = 'fas fa-smog fa-2x';
    } else if (description === 'Squall' || description === 'Tornado') {
        iconClass = 'fas fa-cloud fa-2x';
    }
    return iconClass; 
};

class HourlyContainer extends Component {
    render() {
        const hourlyWeather = this.props.hourlyWeather;
        console.log(hourlyWeather);
        return (
            <div id="hourly-container">
                {hourlyWeather.map((hour, index) => {
                    return <div 
                        key={index}
                        className="tile"
                    >
                        {/* <p id="day">{Moment().add(index + 1, 'days').format('dddd')}</p> */}
                        <p id="time">{hour.hour}</p>
                        <p id="temp">{hour.temp}&deg;F</p>
                        <i className={renderConditionIcon(hour.description)}></i>
                        {/* <p id="wind-speed">Wind Speed: {day.windSpeed}mph</p> */}
                        {/* <p id="humidity">Humidity: {day.humidity}%</p> */}
                    </div>;
                })}
            </div>
        );
    }
}

export default HourlyContainer;