import axios from "axios";

// --- Open Weather API keys and URLS --- //
const weatherAPIKey = '1c15bab08bfbee58f4e3567a79550403';
const oneCallWeatherQueryURL = `https://api.openweathermap.org/data/2.5/onecall?`;
const dailyWeatherQueryURL = `https://api.openweathermap.org/data/2.5/weather?`
const resFormat = `?json=1`;

// --- Google Maps API keys and URLS --- //
const googleMapsAPIKey = 'AIzaSyAqvA8WIVoLVERlwSfo6Us5XZgHwNprMMc';
const googleMapsURL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';

// --- GeoCodeXYZ API keys and URLS --- //
// const geoCodeKey = '905242118968253567432x7028';
const geoCodeURL = `https://geocode.xyz/`;

// --- Map Quest API keys and URLS --- //
const mapQuestKey = '4hhISOmWoS3iV83IKmtT0wAf9YyGwQay';
const mapQuestURL = 'https://www.mapquestapi.com/geocoding/v1/address?';

// --- Rest Countries API keys and URLS --- //
const restCountriesURL = 'https://restcountries.eu/rest/v2/alpha/';

const API = {
    openWeather: {
        weatherData: (lat, lon) => {
            return axios.get(`${oneCallWeatherQueryURL}lat=${lat}&lon=${lon}&appid=${weatherAPIKey}`);
        },
        dailyWeatherData: (lat, lon) => {
            return axios.get(`${dailyWeatherQueryURL}lat=${lat}&lon=${lon}&appid=${weatherAPIKey}`);
        }
    },
    geoCode: {
        searchCoordidateData: searchInput => {
            // return axios.get(`${geoCodeURL}${searchInput}${resFormat}&auth=${geoCodeKey}`);
            return axios.get(`${geoCodeURL}${searchInput}${resFormat}`);
        },
        retrieveLocationCoords: (lat, lon) => {
            // return axios.get(`${geoCodeURL}${lat},${lon}${resFormat}&auth=${geoCodeKey}`);
            return axios.get(`${geoCodeURL}${lat},${lon}${resFormat}`);
        },
    },
    mapQuest: {
        searchCities: searchInput => {
            return axios.get(`${mapQuestURL}key=${mapQuestKey}&location=${searchInput}`)
        },
    },
    restCountries: {
        searchCodes: codeInput => {
            return axios.get(`${restCountriesURL}${codeInput}`);
        }
    },
    googleMaps: {
        searchCoordidates: (lat, lon) => {
            return axios.get(`${googleMapsURL}${lat},${lon}&key=${googleMapsAPIKey}`);
        }
    },
};

export default API;