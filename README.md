# Weather Dashboard

## The Assignment
This was a UW Full-Stack Coding Boot Camp assignment. The task was to build a weather dashboard that allows the user to look up the weather in multiple cities so they can plan a trip. The dashboard was to use the OpenWeather API to retrieve weather data to display current weather and a five-day forecast.

## The Process
I began by creating an HTML page with all the elements I would need - A header, input, submit button, div to hold current weather, and div to hold forecast. After getting all the elements on the page I made a grid system using CSS to align all the items on the page. Next I made the page responsive used a mobile-first approach, working my way up from an iPhone screen to a large laptop. 
Once my grid was in place and my layout responsive, I needed to get some information on the page before I added more styes. Switching to JavaScript, I started by targetting my DOM elements. Next I created varibles that I would need to retrieve weather data from the API, so the user input value, API URL, and my API key. Before I built functionality to display weather data based on user input however, I wanted to make the page to first display data for the user's current location. To do this I retrieved the user's current coordinates using geolocation. I stored their latitude and longitude in variables, then used them in an AJAX call. The call fetched information from the OpenWeather API and returned an object container weather data based on the user's current position. Next I wrote a function that took the response object from the call as a parameter, searched through the object for the values I needed, then created elements, set their text content with the values, and appended the elements to the page. 

## The Outcome

## Next Steps

## Thanks for reading! :smile:
Please contact me with any questions or comments.

My email: austenpturner@msn.com
