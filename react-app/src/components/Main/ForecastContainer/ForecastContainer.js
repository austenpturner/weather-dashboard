import React, { Component } from 'react';
import Moment from "moment";
import renderConditionIcon from "../../../utils/renderIcons";
import "./forecaststyles.css";

class ForecastContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardSide: "front"
        };
    }

    handleCardFlip() {
        if (this.state.cardSide === "front") {
            this.setState({ 
                cardSide: `back`
            });
        } else {
            this.setState({ 
                cardSide: `front`
            });
        }
    }

    render() {
        const forecastData = this.props.forecast;
        return (
            <div id="forecast-container">
                {forecastData.map((day, index) => {
                    return <div 
                        key={index}
                        className="card"
                    >
                        <div 
                            // className={this.state.cardSide === `front` ? "card-front show" : "card-front hide"}
                            className="card-front"
                            id={index}
                            // onClick={this.handleCardFlip.bind(this)}
                        >
                            <p className="day">{Moment().add(index + 1, 'days').format('dddd')}</p>
                            <p className="temp">{day.temp}&deg;F</p>
                            <i className={renderConditionIcon(day.description)}></i>
                        </div>
                        {/* <div 
                            className={this.state.cardSide === `back` ? "card-back show" : "card-back hide"}
                            id={index}
                            onClick={this.handleCardFlip.bind(this)}
                        >
                            <p className="humidity">Humidity: {day.humidity}%</p>
                            <p className="windspeed">Wind Speed: {day.windSpeed}mph</p>
                            <p className="uvIndex">UV Index: {day.uvIndex}</p>
                        </div> */}
                    </div>;
                })}
            </div>
        );
    }
}

export default ForecastContainer;