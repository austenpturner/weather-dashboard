import React, { Component } from 'react';
import Moment from "moment";
import Header from "./Header/Header";
import Nav from "./Nav/Nav";
import SearchBar from "./SearchBar/SearchBar";
import Main from './Main/Main';
import API from "../utils/API";
import utilFunctions from "../utils/utilFunctions";
import localStorage from "../utils/localStorage";
import './dashboardstyles.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentWeather: {},
            date: "",
            forecast: [],
            hourlyWeather: [],
            lat: "",
            location: "",
            lon: "",
            savedLocations: [],
            searchInput: "",
            searchOptions: [],
            showSearchBar: false,
            slideNav: false,
            sunrise: 0,
            sunset: 0,
        };
    }

    // --- Function to find current location city from location coordinates --- //
    geolocate = (lat, lon) =>{
        API.geoCode.retrieveLocationCoords(lat, lon)
        .then(res => {
            let currentLocation;
            if (res.data.country === 'United States of America') {
                currentLocation = `${res.data.city}, ${res.data.state}`;
            } else {
                currentLocation = `${res.data.city}, ${res.data.country}`;
            };
            const location = utilFunctions.capLocation(currentLocation);
            this.setState({ location: location });
        });
    };

    // --- Function to retrieve and set all weather data from location or search coordinates --- //
    getWeatherData = (lat, lon) => {
        API.openWeather.weatherData(lat, lon)
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

    // --- Function to retrieve all location options from search input --- //
    getSearchCities = search => {
        API.mapQuest.searchCities(search)
        .then(res => {
            const searchOptions = [];
            for (let i = 0; i < res.data.results[0].locations.length; i++) {
                const countryCode = res.data.results[0].locations[i].adminArea1;
                const state = res.data.results[0].locations[i].adminArea3;
                const city = res.data.results[0].locations[i].adminArea5;
                if (countryCode === 'US' && city !== '' && state !== '') {
                    const searchLocation = {
                        country: 'US',
                        state: state,
                        city: city
                    };
                    searchOptions.push(searchLocation);
                } else if (countryCode !== '' & countryCode !== 'US' && city !== '') {
                    API.restCountries.searchCodes(countryCode)
                        .then(res => {
                            const country = res.data.name;
                            const searchLocation = {
                                country: country,
                                state: state,
                                city: city
                            };
                            searchOptions.push(searchLocation);
                        });
                };
            };
            this.setState({ searchOptions: searchOptions });
        });
    };

    // --- Function to get lat/lon retrieve weather data from search input --- //
    getLocationCoords = search => {
        API.geoCode.searchCoordidateData(search)
            .then(res => {
                const lat = res.data.latt;
                const lon = res.data.longt;
                this.setState({
                    lat: lat,
                    lon: lon
                });
                this.getWeatherData(lat, lon);
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
            this.geolocate(lat, lon);
            this.getWeatherData(lat, lon);
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setPosition);
        }

        const savedLocations = localStorage.getLocalStorage();
        if (savedLocations !== undefined) {
            this.setState({ savedLocations: savedLocations });
        };
    };

    // --- Handle location search input change --- //
    handleInputChange(event) {
        const search = event.target.value;
        this.setState({ searchInput: search });
        this.getSearchCities(search);
    };

    // --- Handle location search --- //
    handleFormSubmit(event) {
        event.preventDefault();
        const search = this.state.searchInput.trim();

        if (search === '') {
            return;
        } else {
            const searchLocation = utilFunctions.capLocation(search);
            this.setState({ location: searchLocation });
            this.getLocationCoords(search);
        };

        if (this.state.showSearchBar) {
            this.setState({ showSearchBar: false });
        } else {
            this.setState({ showSearchBar: true });
        };

        // clear search input
        this.setState({ searchInput: '' });
        this.setState({ searchOptions: [] });       
    };

    // --- Save location to local storage --- //
    handleLocationSave(event) {
        event.preventDefault();
        const locationInfo = {
            city: this.state.location,
            lat: this.state.lat,
            lon: this.state.lon
        };
        const savedLocations = this.state.savedLocations;

        if (savedLocations.length === 0) {
            savedLocations.push(locationInfo);
            this.setState({ savedLocations: savedLocations });
        } else {
            const savedCityNames = [];
            for (let i = 0; i < savedLocations.length; i++) {
                savedCityNames.push(savedLocations[i].city);
            };
            if (savedCityNames.indexOf(locationInfo.city) === -1) {
                savedLocations.push(locationInfo);
                this.setState({ savedLocations: savedLocations });
            };
        };
        localStorage.setLocalStorage(savedLocations);
    };

    // --- Show search bar on nav search button click --- //
    displaySearchBar(event) {
        event.preventDefault();
        if (this.state.showSearchBar) {
            this.setState({ showSearchBar: false});
        } else {
            this.setState({ showSearchBar: true });
        };
    };

    // --- Show nav slider on nav symbol click --- //
    handleNavSlide() {
        if (this.state.slideNav) {
            this.setState({ slideNav: false});
        } else {
            this.setState({ slideNav: true });
        };
    };

    // --- Handle location selection from nav slider --- //
    handleLocationSelection(event) {
        let selectedLocation;

        if (event.target.className === 'location') {
            selectedLocation = event.target.id;
        } else if (event.target.parentElement.className === 'location') {
            selectedLocation = event.target.parentElement.id;
        };

        this.setState({ location: selectedLocation });
        this.getLocationCoords(selectedLocation);
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
    };
};

export default Dashboard;