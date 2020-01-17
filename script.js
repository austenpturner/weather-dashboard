// DOM elements
const locationInput = $('#location-input');
const searchBtn = $('#search-btn');

const dateEl = $('#date');
const cityEl = $('#city');
const tempEl = $('#temperature');
const humidityEl = $('#humidity');
const windEl = $('#wind-speed');
const uvIndexEl = $('#UV-index');
const conditionIcon = $('#condition-icon');

const dayCardEl = $('.card-day');
const cardIcon = $('.card-icon');
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

dateEl.text(date);

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
        renderConditionIcon(response);           
    });
    $.ajax({
        url: forecastQueryURL,
        method: `GET`
    }).then (function(response){
        renderForecast(response);
        renderForecastIcon(response);            
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
        renderConditionIcon(response);         
    });
    $.ajax({
        url: coordinatesForecastURL,
        method: `GET`
    }).then (function(response){
        renderForecast(response);
        renderForecastIcon(response);           
    });
}

function renderConditions(city) {
    let tempF = Math.floor((city.main.temp - 273.15) * 1.80 + 32)
    let speedMPH = Math.floor(city.wind.speed * 2.237);
    cityEl.text(city.name);
    tempEl.html(`${tempF}&deg;`);
    humidityEl.text(`Humidity: ${city.main.humidity}%`);
    windEl.text(`Wind speed: ${speedMPH}mph`);
    // uvIndexEl.text(`UV Index: ${city.clouds.all}`);
}

function renderForecast(city) {
    dayCardEl.each(function(i) {
        $(this).text(moment().add((i), 'days').format('dddd'));
    })
    tempCardEl.each(function(i) {
        let tempF = Math.floor((city.list[i].main.temp - 273.15) * 1.80 + 32)
        $(this).html(`${tempF}&deg;`);
    })
    humidityCardEl.each(function(i) {
        $(this).text(`Humidity: ${city.list[i].main.humidity}%`);
    })
}

function renderConditionIcon(city) {
    let category = city.weather[0].main;
    conditionIcon.attr('class', '');
    if (category === 'Clouds' || category === 'Fog') {
        conditionIcon.addClass('fas fa-cloud fa-6x');
    } else if (category === 'Rain' || category === 'Drizzle' || category === 'Mist') {
        conditionIcon.addClass ('fas fa-cloud-rain fa-6x');
    } else if (category === 'Snow') {
        conditionIcon.addClass('far fa-snowflake fa-6x');
    } else if (category === 'Thunderstorm') {
        conditionIcon.addClass('fas fa-bolt fa-6x');
    } else if (category === 'Clear') {
        conditionIcon.addClass('fas fa-sun fa-6x');
    } else if (category === 'Smoke' || category === 'Haze' || category === 'Ash' || category === 'Dust' || category === 'Sand') {
        conditionIcon.addClass('fas fa-smog fa-6x');
    } else if (category === 'Squall' || category === 'Tornado') {
        conditionIcon.addClass('fas fa-cloud fa-6x');
    } 
}

function renderForecastIcon(city) {
    cardIcon.each(function(i) {
        let category = city.list[i].weather[0].main;
        $(this).attr('class', 'card-icon');
        if (category === 'Clouds' || category === 'Fog') {
            $(this).addClass('fas fa-cloud fa-2x');
        } else if (category === 'Rain' || category === 'Drizzle' || category === 'Mist') {
            $(this).addClass('fas fa-cloud-rain fa-2x');
        } else if (category === 'Snow') {
            $(this).addClass('far fa-snowflake fa-2x');
        } else if (category === 'Thunderstorm') {
            $(this).addClass('fas fa-bolt fa-2x');
        } else if (category === 'Clear') {
            $(this).addClass('fas fa-sun fa-2x');
        } else if (category === 'Smoke' || category === 'Haze' || category === 'Ash' || category === 'Dust' || category === 'Sand') {
            $(this).addClass('fas fa-smog fa-2x');
        } else if (category === 'Squall' || category === 'Tornado') {
            $(this).addClass('fas fa-cloud fa-2x');
        } 
    })
}