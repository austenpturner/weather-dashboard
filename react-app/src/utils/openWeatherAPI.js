import axios from "axios";

const weatherAPIKey = '1c15bab08bfbee58f4e3567a79550403';

const weatherQueryURL = `https://api.openweathermap.org/data/2.5/weather?q=`;
const forecastQueryURL = `https://api.openweathermap.org/data/2.5/forecast?q=`;
// const UVIndexURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${weatherAPIKey}&lat=${lat}&lon=${lon}`;

const weatherAPI = {
    getWeatherData: (searchInput) => { 
        return axios.get(`${weatherQueryURL}${searchInput}&appid=${weatherAPIKey}`);
    },
    getForecastData: (searchInput) => {
        return axios.get(`${forecastQueryURL}${searchInput}&appid=${weatherAPIKey}`);
    }
};

export default weatherAPI;