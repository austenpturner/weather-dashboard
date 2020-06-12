import axios from "axios";

const weatherAPIKey = '1c15bab08bfbee58f4e3567a79550403';
const geoCodeURL = `https://geocode.xyz/`;
const resFormat = `?json=1`;
const oneCallWeatherQueryURL = `https://api.openweathermap.org/data/2.5/onecall?`;

const weatherAPI = {
    weatherData: (lat, lon) => {
        return axios.get(`${oneCallWeatherQueryURL}lat=${lat}&lon=${lon}&appid=${weatherAPIKey}`);
    },
    searchCoordidateData: searchInput => {
        return axios.get(`${geoCodeURL}${searchInput}${resFormat}`);
    }
};

export default weatherAPI;