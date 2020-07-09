import React, { Component } from 'react';
import Moment from "moment";
import SearchBar from "./SearchBar/SearchBar";
import WeatherContainer from "./WeatherContainer/WeatherContainer";
import HourlyContainer from "./HourlyContainer/HourlyContainer";
import ForecastContainer from "./ForecastContainer/ForecastContainer";
import weatherAPI from "../../utils/openWeatherAPI";
import utilFunctions from "../../utils/utilFunctions";
import localStorageFunctions from "../../utils/localStorage";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: "",
            location: "",
            searchInput: "",
            lat: "",
            lon: "",
            sunrise: 0,
            sunset: 0,
            currentWeather: {},
            hourlyWeather: [],
            forecast: [],
            savedLocations: []
        };
    }

    retrieveWeatherData = (lat, lon) => {
        weatherAPI.weatherData(lat, lon)
            .then(res => {
                const currentRes = res.data.current;
                const temp = utilFunctions.convertToFahrenheit(currentRes.temp);
                const windSpeed = utilFunctions.convertToMPH(currentRes.wind_speed);
                const sunrise = utilFunctions.getDecimal(currentRes.sunrise);
                const sunset = utilFunctions.getDecimal(currentRes.sunset);
                const dailyRes = res.data.daily;
                const forecast = [];
                for (let i = 1; i < 6; i++) {
                    const temp = utilFunctions.convertToFahrenheit(dailyRes[i].temp.day);
                    const windSpeed = utilFunctions.convertToMPH(dailyRes[i].wind_speed);
                    forecast.push({
                        temp: temp,
                        windSpeed: windSpeed,
                        humidity: dailyRes[i].humidity,
                        description: dailyRes[i].weather[0].main,
                        uvIndex: dailyRes[i].uvi
                    });
                };

                const hourlyRes = res.data.hourly;
                const hourlyWeather = [];
                for (let i = 1; i < 26; i++) {
                    const temp = utilFunctions.convertToFahrenheit(hourlyRes[i].temp);
                    const windSpeed = utilFunctions.convertToMPH(hourlyRes[i].wind_speed);
                    const hour = utilFunctions.getTime(hourlyRes[i].dt);
                    hourlyWeather.push({
                        hour: hour,
                        temp: temp,
                        windSpeed: windSpeed,
                        humidity: hourlyRes[i].humidity,
                        description: hourlyRes[i].weather[0].main,
                        uvIndex: hourlyRes[i].uvi
                    });
                };
                
                this.setState({
                    currentWeather: {
                        temp: temp,
                        windSpeed: windSpeed,
                        humidity: currentRes.humidity,
                        description: currentRes.weather[0].main,
                        uvIndex: currentRes.uvi
                    },
                    sunrise: sunrise,
                    sunset: sunset,
                    forecast: forecast,
                    hourlyWeather: hourlyWeather
                });
        });
    };
    
    componentDidMount() {
        const date = Moment().format('dddd, MMMM Do');
        this.setState({ date: date });
        const setPosition = position => {
            this.setState({
                lat: position.coords.latitude,
                lon: position.coords.longitude
            });
            const lat = this.state.lat;
            const lon = this.state.lon;
            this.retrieveWeatherData(lat, lon);
            weatherAPI.retrieveLocationCoords(lat, lon)
            .then(res => {
                const currentLocation = utilFunctions.capLocation(res.data.city);
                this.setState({ location: currentLocation });
            });
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setPosition);
        }

        console.log(localStorageFunctions.getLocalStorage()); 
        this.setState({ savedLocations: localStorageFunctions.getLocalStorage() });
    };

    handleInputChange(event) {
        const search = event.target.value;
        this.setState({ searchInput: search })
    };

    handleFormSubmit(event) {
        event.preventDefault();

        const searchInput = this.state.searchInput;

        if (searchInput === '') {
            return;
        } else {
            const searchLocation = utilFunctions.capLocation(searchInput);
            this.setState({ location: searchLocation });
    
            weatherAPI.searchCoordidateData(searchInput)
                .then(res => {
                    // console.log(`search coordinates:`, res);
                    const lat = res.data.latt;
                    const lon = res.data.longt;
                    this.setState({
                        lat: lat,
                        lon: lon
                    });
                    this.retrieveWeatherData(lat, lon);
                });
        };
    };

    handleLocationSave(event) {
        event.preventDefault();
        const newLocation = utilFunctions.capLocation(this.state.searchInput);
        const savedLocations = this.state.savedLocations;

        if (savedLocations.indexOf(newLocation) === -1) {
            savedLocations.push(newLocation);
            this.setState({ savedLocations: savedLocations });
        }

        localStorageFunctions.setLocalStorage(savedLocations);
        
        console.log(localStorageFunctions.getLocalStorage());
    };

    render() {
        return (
            <div id="main">
                <SearchBar 
                    searchInput={this.state.searchInput}
                    handleInputChange={this.handleInputChange.bind(this)}
                    handleFormSubmit={this.handleFormSubmit.bind(this)}
                    handleLocationSave={this.handleLocationSave.bind(this)}
                />
                <WeatherContainer 
                    currentWeather={this.state.currentWeather}
                    location={this.state.location}
                    date={this.state.date}
                />
                <HourlyContainer 
                    hourlyWeather={this.state.hourlyWeather}
                    location={this.state.location}
                />
                <ForecastContainer 
                    forecast={this.state.forecast}
                    date={this.state.date}
                />
            </div>
        );
    }
}

export default Main;