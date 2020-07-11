import React, { Component } from 'react';
import Moment from "moment";
import Header from "./Header/Header";
import Nav from "./Nav/Nav";
import SearchBar from "./SearchBar/SearchBar";
import Main from './Main/Main';
import weatherAPI from "../utils/openWeatherAPI";
import utilFunctions from "../utils/utilFunctions";
import localStorage from "../utils/localStorage";
import './dashboardstyles.css';

class Dashboard extends Component {
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
            savedLocations: [],
            showSearchBar: false
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

        const savedLocations = localStorage.getLocalStorage();
        if (savedLocations !== undefined) {
            this.setState({ savedLocations: savedLocations });
        };
    };

    handleInputChange(event) {
        const search = event.target.value;
        this.setState({ searchInput: search });
    };

    handleFormSubmit(event) {
        event.preventDefault();

        const search = this.state.searchInput;

        if (search === '') {
            return;
        } else {
            const searchLocation = utilFunctions.capLocation(search);
            this.setState({ location: searchLocation });
    
            weatherAPI.searchCoordidateData(search)
                .then(res => {
                    // console.log(`search coordinates:`, res);
                    const lat = res.data.latt;
                    const lon = res.data.longt;
                    console.log(lat, lon);
                    this.setState({
                        lat: lat,
                        lon: lon
                    });
                    this.retrieveWeatherData(lat, lon);
                });
        };

        if (this.state.showSearchBar) {
            this.setState({ showSearchBar: false});
        } else {
            this.setState({ showSearchBar: true });
        };

        const searchIcon = event.target;
        const searchInput = searchIcon.parentElement.previousSibling;
        console.log(searchInput);

        // clear search input
    };

    handleLocationSave(event) {
        event.preventDefault();
        let newLocation = '';
        if (this.state.searchInput === '') {
            newLocation = utilFunctions.capLocation(this.state.location);
        } else {
            newLocation = utilFunctions.capLocation(this.state.searchInput);
        }

        const locationInfo = {
            city: newLocation,
            lat: this.state.lat,
            lon: this.state.lon
        };

        const savedLocations = this.state.savedLocations;

        if (savedLocations.length === 0) {
            savedLocations.push(locationInfo);
            this.setState({ savedLocations: savedLocations });
        } else {
            for (let i = 0; i < savedLocations.length; i++) {
                const location = savedLocations[i].city;
                if (location === newLocation) {
                    // console.log('already saved');
                    break;
                } else {
                    savedLocations.push(locationInfo);
                    this.setState({ savedLocations: savedLocations });
                }
            }
        };

        localStorage.setLocalStorage(savedLocations);
    };

    displaySearchBar(event) {
        event.preventDefault();
        if (this.state.showSearchBar) {
            this.setState({ showSearchBar: false});
        } else {
            this.setState({ showSearchBar: true });
        };
    };

    handleLocationSelection(event) {
        if (event.target.className === 'location') {
            console.log(event.target.id);
            const selectedLocation = event.target.id;
            this.setState({ location: selectedLocation });
            weatherAPI.searchCoordidateData(selectedLocation)
                .then(res => {
                    // console.log(`search coordinates:`, res);
                    const lat = res.data.latt;
                    const lon = res.data.longt;
                    console.log(lat, lon);
                    this.setState({
                        lat: lat,
                        lon: lon
                    });
                    this.retrieveWeatherData(lat, lon);
                });
        } else if (event.target.parentElement.className === 'location') {
            console.log(event.target.parentElement.id);
            const selectedLocation = event.target.parentElement.id;
            this.setState({ location: selectedLocation });
            weatherAPI.searchCoordidateData(selectedLocation)
                .then(res => {
                    // console.log(`search coordinates:`, res);
                    const lat = res.data.latt;
                    const lon = res.data.longt;
                    console.log(lat, lon);
                    this.setState({
                        lat: lat,
                        lon: lon
                    });
                    this.retrieveWeatherData(lat, lon);
                });
        };
    };

    render() {
        return (
            <div id="dashboard">
                <Header 
                    date={this.state.date}
                />
                <Nav
                    displaySearchBar={this.displaySearchBar.bind(this)}
                    handleLocationSave={this.handleLocationSave.bind(this)}
                    handleLocationSelection={this.handleLocationSelection.bind(this)}
                />
                <SearchBar
                    showSearchBar={this.state.showSearchBar}
                    searchInput={this.state.searchInput}
                    handleInputChange={this.handleInputChange.bind(this)}
                    handleFormSubmit={this.handleFormSubmit.bind(this)}
                />
                <Main
                    showSearchBar={this.state.showSearchBar} 
                    location={this.state.location}
                    hourlyWeather={this.state.hourlyWeather}
                    currentWeather={this.state.currentWeather}
                    forecast={this.state.forecast}
                    date={this.state.date}
                />
            </div>
        );
    }
}

export default Dashboard;