import React, { Component } from 'react';
import Moment from "moment";
import renderConditionIcon from "../../../utils/renderIcons";
import "../../dashboardstyles.css";

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
                        <p className="day">{Moment().add(index + 1, 'days').format('dddd')}</p>
                        <p className="temp">{day.temp}&deg;F</p>
                        <i className={renderConditionIcon(day.description)}></i>
                    </div>;
                })}
            </div>
        );
    }
}

export default ForecastContainer;