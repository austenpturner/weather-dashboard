# Weather Dashboard

## The Assignment
This was a UW Full-Stack Coding Boot Camp assignment. The task was to build a weather dashboard that allows the user to look up the weather in multiple cities so they can plan a trip. Using the OpenWeather API, the dashboard should retrieve weather data to display current weather and a five-day forecast.

## The Process
I began by creating an HTML page with all the elements I would need - A header, input element, submit button, a div to hold current weather elements, and div to hold forecast elements. After getting all the elements on the page I made a grid system using CSS to align all the items on the page. Next I made the page responsive using a mobile-first approach, working my way up from an iPhone screen to a large laptop. 

Once my grid was in place and my layout responsive, I needed to get some information on the page before I added more styes. Switching to JavaScript, I started by targetting my DOM elements and assigning them to variables. Next I created varibles that I would need to retrieve weather data from the API, so the user input value, API URL, and my API key. I used Moment.js to display the current day and date. Before I built functionality to display weather data based on user input, I wanted to make the page first display weather data for the user's current location. To do this I retrieved the user's current coordinates using geolocation. I stored the latitude and longitude in variables, then used them in an AJAX call. The call fetched information from the OpenWeather API and returned an object containing weather data based on the user's current position. Next I wrote a function that took the response object from the call as a parameter, searched through the object for the values I needed, then created elements, set their text content to the values, and appended the elements to the page. I repeated these steps again with another URL and AJAX call to also render the forecast data.

Now that my page displayed current location weather data, I started to built the functionality to make it display data based on user input. I started by putting a 'click' event listener on the search button. In the event listener callback function I made another AJAX call to the weather API using the city input value as the location. When the promise was fulfilled and the object returned I called the same function that I used with the current location call to get and display the weather data.

At this point I realized I was missing a key piece of information that I needed my dashboard to include per the assignment instructions - UV Index. The current object returned being returned included data for temperature, humidity and wind speed but not UV Index. I needed to make another AJAX call using another URL to retrieve this data. However, the tricky part was that this call would only take coordinates, not a city name. I figured out that I could nest the UV Index AJAX call inside of the first and use the latitude and longeitude data returned by the first. 

After the dashboard was accepting user input, I needed to write functionality that allowed the user to save locations and access them later. I included a save button, added an event listener, and wrote a function to save a location to local storage when the user clicked the save button. Next I wrote a function to access the locations object in local storage and render them back to the screen. I displayed user saved locations in a side bar that slides in and out of the page when the user clicks an icon. Each saved location is also accompanied by a delete icon. When the user clicks the delete icon the saved location is deleted from the side bar and deleted from local storage. Finally, I added an event listener and function that would search for weather data for a saved location when a user clicked on it. 

Last I added some finishing CSS style touches. I inlcuded color and transitions, as well as updating the responsive layout. It was tricky working with the saved location side bar.

## The Outcome
The result is a functional weather dashboard app. It displays current weather info, accepts user input and displays weather for a searched city, and allows the user to save and delete locations. 

## Next Steps
Currently, the app will capitalize the first letter of a user's search input. If a location is already saved and the user clicks save, the program will recognize that "seattle" is the same as "Seattle" and not save the location again. However right now the function only works for single-word cities. What about San Jose? The program will not recognize that "San jose" is the same as "San Jose". My next step would be to fix this bug. Also, I would like the dashboard to change colors and symbols depending on if the current time in the location displayed was night or day. To do this I could somehow use the sunrise and sunset data returned by the API. 

## Thanks for reading! :smile:
Please contact me with any questions or comments.

My email: austenpturner@msn.com
