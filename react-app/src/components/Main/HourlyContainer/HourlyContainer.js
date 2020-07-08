import React, { Component } from 'react';
import renderConditionIcon from "../../../utils/renderIcons";
import "./hourlystyles.css";

class HourlyContainer extends Component {
    render() {
        const hourlyWeather = this.props.hourlyWeather;
        return (
            <div id="hourly-container">
                {hourlyWeather.map((hour, index) => {
                    return <div 
                        key={index}
                        className="tile"
                    >
                        <p id="time">{hour.hour}</p>
                        <p id="temp">{hour.temp}&deg;F</p>
                        <i className={renderConditionIcon(hour.description)}></i>
                    </div>;
                })}
            </div>
        );
    }
}

export default HourlyContainer;