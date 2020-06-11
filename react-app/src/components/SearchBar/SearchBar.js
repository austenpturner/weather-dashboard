import React, { Component } from 'react';
// import axios from 'axios';
import weatherAPI from "../../utils/openWeatherAPI";
import "./searchstylesheet.css";

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: "",
            description: "",
            temp: 0,
            humidity: 0,
            windSpeed: 0,
            UVIndex: 0,
            lat: 0,
            lon: 0,
            forecast: []
        };
    }

    handleInputChange(event) {
        const search = event.target.value;
        this.setState({ searchInput: search })
    }

    handleFormSubmit(event) {
        event.preventDefault();
        // console.log(this.state.searchInput);
        const searchInput = this.state.searchInput;
        weatherAPI.getWeatherData(searchInput)
            .then(res => {
                const results = res.data;
                // console.log(res);
                this.setState({ description: results.weather[0].main });
                this.setState({ temp: results.main.temp });
                this.setState({ humidity: results.main.humidity });
                this.setState({ windSpeed: results.wind.speed });
                this.setState({ lat: results.coord.lat });
                this.setState({ lon: results.coord.lon });
                console.log(this.state);
            });
        weatherAPI.getForecastData(searchInput)
            .then(res => {
                const results = res.data;
                const forecast = [];
                console.log(res);
                for (let i = 1; i < 6; i++) {
                    forecast.push({
                        temp: results.list[i].main.temp,
                        humidity: results.list[i].main.humidity
                    })
                }
                this.setState({ forecast: forecast });
                console.log(this.state.forecast);
            });
    }

    render() {
        return (
            <div id="search-bar">
                <form>
                    <div className="form-group">
                        <label htmlFor="search">Search for a city:</label>
                        <input 
                            type="text" 
                            name="search" 
                            id="search-input"
                            value={this.state.searchInput} 
                            onChange={this.handleInputChange.bind(this)}
                        />
                        <button  
                            id='search-btn'
                            onClick={this.handleFormSubmit.bind(this)}
                        >
                            <i 
                                className='fas fa-search fa-lg'
                            ></i>
                        </button>
                        <button id='save-btn'>
                            <i className='far fa-bookmark fa-lg'></i>
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default SearchBar;