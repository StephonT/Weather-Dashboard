//API Key
var apiKey = "7c0b6aaecdbe620bab99fac8b7710966"

var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#cityname");
var currentContainerEl = document.querySelector("#current-container")
var citySearchTerm = document.querySelector("#city-search-term")
var currentDateEl = document.querySelector("#city-current-date")
var currentIconEl = document.querySelector("#city-current-icon")


//Function that will execute upon form submission

var formSubmitHandler = function(event) {
    event.preventDefault();

    //get value from input element
    var cityname = cityInputEl.value.trim();

    if(cityname) {
        getCityWeather(cityname);
        cityInputEl.value= "";
    } else {
        alert("Please enter city name")
    }

    console.log(event);
};


var getCityWeather = function(city) {
    // format the openweather api
   var currentWeatherUrl= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperials&appid=" + apiKey;

   //make a request to url
   fetch(currentWeatherUrl).then(function(response) {
    response.json().then(function(data) {
        
        // diplay city data to the console 
        displayCityWeather(data, city)
        
    })
   })
    
}

// Function to display current weather for city
var displayCityWeather = function (city, searchTerm) {
    console.log(city);
    console.log(searchTerm);

    // clear old content
    currentContainerEl.textContent = "";
    citySearchTerm.textContent = searchTerm;

    //display current weather data 
    var displayCurrentDate = document.querySelector("#city-current-date")
    var currentDate = moment();
    displayCurrentDate.textContent = currentDate.format("(L)");

    //display weather icon
    var displayIcon = document.querySelector("#city-current-icon")
    var currentIcon = "http://openweathermap.org/img/wn/" + city.weather[0].icon + "@2x.png";
    displayIcon.setAttribute ("src", currentIcon);

     // display temperature 
     var displayTemp = document.querySelector("#temp-input");
     var currentTemp = Math.round(city.main.temp * (9/5) - 459.67).toFixed(0) + " °F";
     displayTemp.textContent = currentTemp; 

      //display humidity
     var displayHumidity = document.querySelector("#humidity-input");
     var currentHumidity = city.main.humidity + "%";
     displayHumidity.textContent = currentHumidity

     //display wind
     var displayWind = document.querySelector("#wind-input");
     var currentWind = city.wind.speed + " mph";
     displayWind.textContent = currentWind
    
}

  userFormEl.addEventListener("submit", formSubmitHandler);
  
  