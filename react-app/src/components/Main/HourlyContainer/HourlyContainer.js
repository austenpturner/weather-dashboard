import React, { Component } from 'react';
import Moment from "moment";
import "./hourlystyles.css";

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
                        <p id="temp">{hour.temp}&deg;F</p>
                        {/* <i className={renderConditionIcon(day.description)}></i> */}
                        {/* <p id="wind-speed">Wind Speed: {day.windSpeed}mph</p> */}
                        {/* <p id="humidity">Humidity: {day.humidity}%</p> */}
                    </div>;
                })}
            </div>
        );
    }
}

export default HourlyContainer;