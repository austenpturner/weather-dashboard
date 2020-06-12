import React, { Component } from 'react';
import SearchBar from "./SearchBar/SearchBar";
import WeatherContainer from "./WeatherContainer/WeatherContainer";
import ForecastContainer from "./ForecastContainer/ForecastContainer";
import weatherAPI from "../../utils/openWeatherAPI";

const calculateSunStatus = (unixSunrise) => {
    // Create a new JavaScript Date object based on the timestamp
    let unix_timestamp = unixSunrise;
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    const date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    const hours = date.getHours();
    // Minutes part from the timestamp
    const minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    const seconds = "0" + date.getSeconds();
    // Will display time in 10:30:23 format
    return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
};

const getDecimal = unixNum => {
  const regex = /:/gi; 
  const time = calculateSunStatus(unixNum);
  const decimal = time.replace(regex, ".");
  return parseFloat(decimal);
};

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: "",
            lat: "",
            lon: "",
            sunrise: 0,
            sunset: 0,
            currentWeather: {},
            hourlyWeather: [],
            forecast: []
        };
    }

    handleInputChange(event) {
        const search = event.target.value;
        this.setState({ searchInput: search })
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const searchInput = this.state.searchInput;
        weatherAPI.searchCoordidateData(searchInput)
            .then(res => {
                // console.log(`search coordinates:`, res);
                const lat = res.data.latt;
                const lon = res.data.longt;
                this.setState({
                    lat: lat,
                    lon: lon
                });
                weatherAPI.weatherData(lat, lon)
                    .then(res => {
                        // console.log(`one call data:`, res);
                        const currentRes = res.data.current;

                        const unixSunrise = currentRes.sunrise;
                        const unixSunset = currentRes.sunset;

                        const sunrise = getDecimal(unixSunrise);
                        const sunset = getDecimal(unixSunset);

                        const dailyRes = res.data.daily;
                        const forecast = [];
                        for (let i = 1; i < 6; i++) {
                            forecast.push({
                                temp: dailyRes[i].temp.day,
                                windSpeed: dailyRes[i].wind_speed,
                                humidity: dailyRes[i].humidity,
                                description: dailyRes[i].weather[0].main,
                                uvIndex: dailyRes[i].uvi
                            });
                        };

                        const hourlyRes = res.data.hourly;
                        const hourlyWeather = [];
                        for (let i = 0; i < 12; i++) {
                            hourlyWeather.push({
                                temp: hourlyRes[i].temp.day,
                                windSpeed: hourlyRes[i].wind_speed,
                                humidity: hourlyRes[i].humidity,
                                description: hourlyRes[i].weather[0].main,
                                uvIndex: hourlyRes[i].uvi
                            });
                        };
                        
                        this.setState({
                            currentWeather: {
                                temp: currentRes.temp,
                                windSpeed: currentRes.wind_speed,
                                humidity: currentRes.humidity,
                                description: currentRes.weather[0].main,
                                uvIndex: currentRes.uvi
                            },
                            sunrise: sunrise,
                            sunset: sunset,
                            forecast: forecast,
                            hourlyWeather: hourlyWeather
                        });
                        console.log(this.state);
                });
            });
    };

    render() {
        return (
            <div id="main">
                <SearchBar 
                    searchInput={this.state.searchInput}
                    handleInputChange={this.handleInputChange.bind(this)}
                    handleFormSubmit={this.handleFormSubmit.bind(this)}
                />
                <WeatherContainer />
                <ForecastContainer />
            </div>
        );
    }
}

export default Main;