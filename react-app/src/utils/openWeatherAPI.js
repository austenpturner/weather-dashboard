import axios from "axios";

const weatherAPIKey = '1c15bab08bfbee58f4e3567a79550403';
const oneCallWeatherQueryURL = `https://api.openweathermap.org/data/2.5/onecall?`;
const resFormat = `?json=1`;

const geoCodeKey = '212959806664248386919x6259';
const geoCodeURL = `https://geocode.xyz/`;

const mapQuestKey = '4hhISOmWoS3iV83IKmtT0wAf9YyGwQay';
const mapQuestURL = 'https://www.mapquestapi.com/geocoding/v1/address?';

const restCountriesURL = 'https://restcountries.eu/rest/v2/alpha/';



const weatherAPI = {
    weatherData: (lat, lon) => {
        return axios.get(`${oneCallWeatherQueryURL}lat=${lat}&lon=${lon}&appid=${weatherAPIKey}`);
    },
    searchCoordidateData: searchInput => {
        return axios.get(`${geoCodeURL}${searchInput}${resFormat}&auth=${geoCodeKey}`);
    },
    retrieveLocationCoords: (lat, lon) => {
        return axios.get(`${geoCodeURL}${lat},${lon}${resFormat}&auth=${geoCodeKey}`);
    },
    searchCities: searchInput => {
        return axios.get(`${mapQuestURL}key=${mapQuestKey}&location=${searchInput}`)
    },
    searchCodes: codeInput => {
        return axios.get(`${restCountriesURL}${codeInput}`);
    }
};

export default weatherAPI;