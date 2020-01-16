// DOM elements
const locationInput = $('#location-input');
const searchBtn = $('#search-btn');

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
let newLocation; 
let weatherQueryURL;
let forecastQueryURL;

searchBtn.click(function(event) {
    event.preventDefault();
    newLocation = locationInput.val();
    weatherQueryURL = `https://api.openweathermap.org/data/2.5/weather?q=${newLocation}&appid=${weatherAPIKey}`;
    forecastQueryURL = 
    `https://api.openweathermap.org/data/2.5/forecast?q=${newLocation}&APPID=${weatherAPIKey}`;
    $.ajax({
        url: weatherQueryURL,
        method: `GET`
    }).then (function(response){
        // console.log(response); 
        renderConditions(response);            
    });
    $.ajax({
        url: forecastQueryURL,
        method: `GET`
    }).then (function(response){
        renderForecast(response);            
    });
    
})

function renderConditions(city) {
    cityEl.text(`${city.name} ${date}`);
    tempEl.text(city.main.temp);
    humidityEl.text(city.main.humidity);
    windEl.text(city.wind.speed);
    uvIndexEl.text('');
}

function renderForecast(city) {
    dayCardEl.each(function(i) {
        $(this).text(moment().add((i), 'days').format('dddd'));
    })
    tempCardEl.each(function(i) {
        // console.log(city.list[i].main.temp);
        $(this).text(city.list[i].main.temp);
    })
    humidityCardEl.each(function(i) {
        // console.log(city.list[i].main.humidity);
        $(this).text(city.list[i].main.humidity);
    })
}


