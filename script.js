// DOM elements
const locationInput = $('#location-input');
const searchBtn = $('#search-btn');
const conditionsContainer = $('#conditions-container');
const forecastContainer = $('#forecast-container');

// Weather dashboard variables
let weatherAPIKey = '1c15bab08bfbee58f4e3567a79550403';
let newLocation; 
let weatherQueryURL;

searchBtn.click(function(event) {
    event.preventDefault();
    newLocation = locationInput.val();
    weatherQueryURL = `https://api.openweathermap.org/data/2.5/weather?q=${newLocation}&appid=${weatherAPIKey}`;
    $.ajax({
        url: weatherQueryURL,
        method: `GET`
    }).then (function(response){
        console.log(response);               
    });
})


