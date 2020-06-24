import React, { Component } from 'react';
import Moment from "moment";
import SearchBar from "./SearchBar/SearchBar";
import WeatherContainer from "./WeatherContainer/WeatherContainer";
import HourlyContainer from "./HourlyContainer/HourlyContainer";
import ForecastContainer from "./ForecastContainer/ForecastContainer";
import weatherAPI from "../../utils/openWeatherAPI";

const calculateTime = (unixSunrise) => {
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
  const time = calculateTime(unixNum);
  const decimal = time.replace(regex, ".");
  return parseFloat(decimal);
};

const capLocation = location => {
    const locationWords = location.toLowerCase().split(' ');
    let capLocation = '';
    for (let i = 0; i < locationWords.length; i++) {
        const splitWord = locationWords[i].split('');
        const capfirst = splitWord[0].toUpperCase();
        splitWord.shift([0]); 
        splitWord.unshift(capfirst);
        const capWord = splitWord.join(''); 
        if (i === 0) {
            capLocation += capWord;
        } else {
            capLocation += ` ${capWord}`;
        }
    }
    return capLocation;
}

const getTime = hour => {
    const time = getDecimal(hour);
    if (time > 12) {
        return time - 12 + ":00pm";
    } else if (time === 0 ) {
        return 12 + ":00am";
    } else {
        return time + ":00am";
    }
}

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
            forecast: []
        };
    }

    retrieveWeatherData = (lat, lon) => {
        weatherAPI.weatherData(lat, lon)
            .then(res => {
                // console.log(`one call data:`, res);
                const currentRes = res.data.current;

                const rawTemp = currentRes.temp;
                const temp = Math.floor((rawTemp  - 273.15) * 1.8 + 32);

                const rawWindSpeed = currentRes.wind_speed;
                const windSpeed = Math.floor(rawWindSpeed * 2.237);

                const unixSunrise = currentRes.sunrise;
                const unixSunset = currentRes.sunset;

                const sunrise = getDecimal(unixSunrise);
                const sunset = getDecimal(unixSunset);

                const dailyRes = res.data.daily;
                const forecast = [];
                for (let i = 1; i < 6; i++) {
                    const rawTemp = dailyRes[i].temp.day;
                    const temp = Math.floor((rawTemp - 273.15) * 1.8 + 32);
                    const rawWindSpeed = dailyRes[i].wind_speed;
                    const windSpeed = Math.floor(rawWindSpeed * 2.237);
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
                for (let i = 1; i < 13; i++) {
                    const rawTemp = hourlyRes[i].temp;
                    const temp = Math.floor((rawTemp - 273.15) * 1.8 + 32);
                    const rawWindSpeed = hourlyRes[i].wind_speed;
                    const windSpeed = Math.floor(rawWindSpeed * 2.237);
                    const hour = getTime(hourlyRes[i].dt)

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
                // console.log(this.state);
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
            // console.log(this.state);
            const lat = this.state.lat;
            const lon = this.state.lon;
            this.retrieveWeatherData(lat, lon);
            weatherAPI.retrieveLocationCoords(lat, lon)
            .then(res => {
                const currentLocation = capLocation(res.data.city);
                this.setState({ location: currentLocation });
            });
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setPosition);
        }
    };

    handleInputChange(event) {
        const search = event.target.value;
        this.setState({ searchInput: search })
    };

    handleFormSubmit(event) {
        event.preventDefault();

        const searchInput = this.state.searchInput;
        const searchLocation = capLocation(searchInput);
        this.setState({ location: searchLocation });

        weatherAPI.searchCoordidateData(searchInput)
            .then(res => {
                console.log(`search coordinates:`, res);
                const lat = res.data.latt;
                const lon = res.data.longt;
                this.setState({
                    lat: lat,
                    lon: lon
                });
                this.retrieveWeatherData(lat, lon);
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