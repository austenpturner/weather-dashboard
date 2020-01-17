// DOM elements
const locationInput = $('#location-input');
const searchBtn = $('#search-btn');

const dateEl = $('#date');
const cityEl = $('#city');
const tempEl = $('#temperature');
const humidityEl = $('#humidity');
const windEl = $('#wind-speed');
const uvIndexEl = $('#UV-index');

const dayCardEl = $('.card-day');
const tempCardEl = $('.card-temperature');
const humidityCardEl = $('.card-humidity');

// Weather dashboard 
let date = moment().format('dddd, MMMM Do');
let weatherAPIKey = '1c15bab08bfbee58f4e3567a79550403';
let currentLocation;
let lon;
let lat;
let newLocation;
let coordinatesWeatherURL;
let weatherQueryURL;
let forecastQueryURL;

if (navigator.geolocation) {
    console.log('yes');
    navigator.geolocation.getCurrentPosition(displayLocationInfo);
} else {
    console.log('no');
}

searchBtn.click(function(event) {
    event.preventDefault();
    newLocation = locationInput.val();
    weatherQueryURL = `https://api.openweathermap.org/data/2.5/weather?q=${newLocation}&appid=${weatherAPIKey}`;
    forecastQueryURL = 
    `https://api.openweathermap.org/data/2.5/forecast?q=${newLocation}&appid=${weatherAPIKey}`;
    $.ajax({
        url: weatherQueryURL,
        method: `GET`
    }).then (function(response){ 
        renderConditions(response);            
    });
    $.ajax({
        url: forecastQueryURL,
        method: `GET`
    }).then (function(response){
        renderForecast(response);            
    });
    
})

function displayLocationInfo(position) {
    lon = position.coords.longitude;
    lat = position.coords.latitude;

    coordinatesWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}`
    coordinatesForecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}`;

    $.ajax({
        url: coordinatesWeatherURL,
        method: `GET`
    }).then (function(response){ 
        renderConditions(response);           
    });
    $.ajax({
        url: coordinatesForecastURL,
        method: `GET`
    }).then (function(response){
        renderForecast(response);            
    });
}

function renderConditions(city) {
    let tempF = Math.floor((city.main.temp - 273.15) * 1.80 + 32)
    dateEl.text(date);
    cityEl.text(city.name);
    tempEl.text(`Temperature: ${tempF}`);
    humidityEl.text(`Humidity: ${city.main.humidity}`);
    windEl.text(`Wind speed: ${city.wind.speed}`);
    uvIndexEl.text('');
}

function renderForecast(city) {
    dayCardEl.each(function(i) {
        $(this).text(moment().add((i), 'days').format('dddd'));
    })
    tempCardEl.each(function(i) {
        let tempF = Math.floor((city.list[i].main.temp - 273.15) * 1.80 + 32)
        $(this).text(`Temperature: ${tempF}`);
    })
    humidityCardEl.each(function(i) {
        $(this).text(`Humidity: ${city.list[i].main.humidity}`);
    })
}


