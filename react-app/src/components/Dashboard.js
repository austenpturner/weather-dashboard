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
            searchOptions: [],
            lat: "",
            lon: "",
            sunrise: 0,
            sunset: 0,
            currentWeather: {},
            hourlyWeather: [],
            forecast: [],
            savedLocations: [],
            showSearchBar: false,
            slideNav: false
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
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            this.setState({
                lat: lat,
                lon: lon
            });
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
        weatherAPI.searchCities(search)
            .then(res => {
                const searchOptions = [];
                for (let i = 0; i < res.data.results[0].locations.length; i++) {
                    const cities = res.data.results[0].locations[i].adminArea5;
                    const state = res.data.results[0].locations[i].adminArea3;
                    if (cities !== '' && state !== '') {
                        searchOptions.push(`${cities}, ${state}`);
                        // console.log(searchOptions);
                    };
                };
                this.setState({ searchOptions: searchOptions });
            });
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
                    const lat = res.data.latt;
                    const lon = res.data.longt;
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

        // clear search input
        this.setState({ searchInput: '' });       
    };

    handleLocationSave(event) {
        event.preventDefault();
        let newLocation = '';
        if (this.state.searchInput === '') {
            newLocation = utilFunctions.capLocation(this.state.location);
        } else {
            newLocation = utilFunctions.capLocation(this.state.searchInput);
        };

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
                };
            };
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

    handleNavSlide() {
        if (this.state.slideNav) {
            this.setState({ slideNav: false});
        } else {
            this.setState({ slideNav: true });
        };
    };

    handleLocationSelection(event) {
        if (event.target.className === 'location') {
            const selectedLocation = event.target.id;
            this.setState({ location: selectedLocation });
            weatherAPI.searchCoordidateData(selectedLocation)
                .then(res => {
                    const lat = res.data.latt;
                    const lon = res.data.longt;
                    this.setState({
                        lat: lat,
                        lon: lon
                    });
                    this.retrieveWeatherData(lat, lon);
                });
        } else if (event.target.parentElement.className === 'location') {
            const selectedLocation = event.target.parentElement.id;
            this.setState({ location: selectedLocation });
            weatherAPI.searchCoordidateData(selectedLocation)
                .then(res => {
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

    render() {
        return (
            <div id="dashboard">
                <Header 
                    date={this.state.date}
                />
                <Nav
                    slideNav={this.state.slideNav}
                    handleNavSlide={this.handleNavSlide.bind(this)}
                    displaySearchBar={this.displaySearchBar.bind(this)}
                    handleLocationSave={this.handleLocationSave.bind(this)}
                    handleLocationSelection={this.handleLocationSelection.bind(this)}
                />
                <SearchBar
                    showSearchBar={this.state.showSearchBar}
                    searchInput={this.state.searchInput}
                    searchOptions={this.state.searchOptions}
                    handleInputChange={this.handleInputChange.bind(this)}
                    handleFormSubmit={this.handleFormSubmit.bind(this)}
                />
                <Main
                    slideNav={this.state.slideNav}
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