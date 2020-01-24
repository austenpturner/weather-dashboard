// DOM elements
const locationInput = $('#location-input');
const searchBtn = $('#search-btn');
const saveBtn = $('#save-btn');
const navSymbol = $('#nav-symbol');
const savedLocationsEl = $('#saved-locations');

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

// Variables
let date = moment().format('dddd, MMMM Do');
let weatherAPIKey = '1c15bab08bfbee58f4e3567a79550403';
let currentLocation;
let lon;
let lat;
let newLocation;
let coordinatesWeatherURL;
let weatherQueryURL;
let forecastQueryURL;
let capLocation;
let searches = [];

dateEl.text(date);
renderSavedLocations();

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(displayLocationInfo);
} 

// Event Listeners
searchBtn.click(function(event) {
    event.preventDefault();
    newLocation = locationInput.val();
    renderLocationData();
})

navSymbol.click(function() {
    if (savedLocationsEl.hasClass('slide-right')) {
        savedLocationsEl.removeClass('slide-right').addClass('slide-left');
    } else if (savedLocationsEl.hasClass('slide-left')) {
        savedLocationsEl.removeClass('slide-left').addClass('slide-right');
    }
})

saveBtn.click(function(e) {
    e.preventDefault();
    capSearch();
    // TO DO: what about cities with multiple words? Like San Jose? 
    if (searches.indexOf(capLocation) === -1 && locationInput.val() !== '') {
        searches.push(capLocation);
        saveSearches();
        let newLocationContainer = $('<div>');
        let newDeleteIcon = $('<i>');
        let newSavedCity = $('<li>');
        newDeleteIcon.addClass('fas fa-times');
        newSavedCity.text(capLocation);
        newLocationContainer.append(newSavedCity);
        newLocationContainer.append(newDeleteIcon);      
        savedLocationsEl.append(newLocationContainer);
    }
})

savedLocationsEl.on('click', '.fa-times', function() {
    let elToDelete = $(this).parent();
    let liToDelete = $(this).prev();
    let locationToDelete = liToDelete.text();
        for (let i = 0; i < searches.length; i++) {
        if (searches[i] === locationToDelete) {
            searches.splice(i, 1);
            saveSearches();
        }
    }
    elToDelete.remove();
})

savedLocationsEl.on('click', 'li', function() {
    newLocation = $(this).text();
    renderLocationData();
})

// Functions
function displayLocationInfo(position) {
    lon = position.coords.longitude;
    lat = position.coords.latitude;

    coordinatesWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}`;
    coordinatesForecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}`;
    coordinatesUVIndexURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${weatherAPIKey}&lat=${lat}&lon=${lon}`;

    $.ajax({
        url: coordinatesUVIndexURL,
        method: `GET`
    }).then (function(response){
        renderUV(response);           
    });
    $.ajax({
        url: coordinatesWeatherURL,
        method: `GET`
    }).then (function(response){ 
        $('#spacer').hide();
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

function renderLocationData() {
    weatherQueryURL = `https://api.openweathermap.org/data/2.5/weather?q=${newLocation}&appid=${weatherAPIKey}`;
    forecastQueryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${newLocation}&appid=${weatherAPIKey}`;
    UVIndexURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${weatherAPIKey}&lat=${lat}&lon=${lon}`;

    $.ajax({
        url: weatherQueryURL,
        method: `GET`
    }).then (function(response){ 
        $('#spacer').hide();
        renderConditions(response); 
        renderConditionIcon(response);
        lat = response.coord.lat;
        lon = response.coord.lon;
        $.ajax({
            url: UVIndexURL,
            method: `GET`
        }).then (function(response){
            renderUV(response);           
        });           
    });
    $.ajax({
        url: forecastQueryURL,
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
    $('.column').animate({ opacity: '1' }, 1000);
}

function renderUV(city) {
    uvIndexEl.text(`UV Index: ${city.value}`);
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
    $('.forecast-card').animate({ opacity: '1' }, 1500);
    $('#forecast-heading').animate({ opacity: '1' }, 1500);
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

function capSearch() {
    let location = locationInput.val().split('')
    let capFirst = location[0].toUpperCase();
    location.shift(location[0]);
    location.unshift(capFirst);
    capLocation = location.join('');
}

function saveSearches() {
    let savedLocations = {
        locations: searches
    }
    localStorage.setItem('mySavedSearches', JSON.stringify(savedLocations));
}

function renderSavedLocations() {
    if (JSON.parse(localStorage.getItem('mySavedSearches')) !== null) {
        searches = JSON.parse(localStorage.getItem('mySavedSearches')).locations;
        for (let i = 0; i < searches.length; i++) {
            let newLocationContainer = $('<div>');
            let newDeleteIcon = $('<i>');
            let newSavedCity = $('<li>');
            newDeleteIcon.addClass('fas fa-times');
            newSavedCity.text(searches[i]);
            newLocationContainer.append(newSavedCity);
            newLocationContainer.append(newDeleteIcon);      
            savedLocationsEl.append(newLocationContainer);
        }
    }
}