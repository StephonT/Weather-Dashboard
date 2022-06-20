//API Key
var apiKey = "7c0b6aaecdbe620bab99fac8b7710966"

// DOM elements to display on page 
var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city-input");
var cityContainerEl = document.querySelector("#city-container");
var citySearchTerm = document.querySelector("#city-search-term");
var currentWeather = document.querySelector("#current-weather");
var previousCityEl = document.getElementById("search-container");
var fiveDayEl = document.querySelector("#forecast-cards");
var currentUvEl = document.querySelector("#uv-input")

// To save to local storage
var cityArray = JSON.parse(localStorage.getItem('city')) || [];


//Function that will execute upon form submission

var formSubmitHandler = function(event) {
    event.preventDefault();

    //get value from input element
    var city = cityInputEl.value.trim();

    if(city) {
        getCityWeather(city);
        getForecast(city)
        recentCity(city);

        // Push city name into Array in Local Storage
        cityArray.push(city);
        saveRecentCity();


         // Empty City Search Bar
         cityInputEl.value= "";
        
    } else {
        alert("Please enter city name")
    }

};

   
// Requesting Current Weather API

var getCityWeather = function(city) {
    // format the openweather api
   var currentWeatherUrl= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperials&appid=" + apiKey;

   //if response was successful
   fetch(currentWeatherUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data){

               // diplay city data to the console 
        displayCityWeather(data, city) 
            })
        } else {
            alert("Error:" + response.statusText);
        }
    })
    //if network error
    .catch(function(error) {
        alert("Unable to connect to Open Weather");
    })
};

// Function to display current weather data
var displayCityWeather = function (city, searchTerm) {
    console.log(city);
    console.log(searchTerm);

    // clear old content
    //cityContainerEl.textContent = "";
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
     var currentTemp = (city.main.temp * (9/5) - 459.67).toFixed(0) + " °F";
     displayTemp.textContent = currentTemp; 

      //display humidity
     var displayHumidity = document.querySelector("#humidity-input");
     var currentHumidity = city.main.humidity + "%";
     displayHumidity.textContent = currentHumidity

     //display wind
     var displayWind = document.querySelector("#wind-input");
     var currentWind = city.wind.speed + " mph";
     displayWind.textContent = currentWind


     //for Uv Index
     var lon = city.coord.lon;
     var lat = city.coord.lat;

     searchCityUV(lon, lat, city)
    
}

 

     // requesting UV index API 
var searchCityUV = function(lon, lat, city) {
    var uvUrl = "https://api.openweathermap.org/data/2.5/uvi?q=" + city + "&appid=" + apiKey + "&lat=" + lat + "&lon=" + lon; 

    fetch(uvUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(lon, lat, city) {
                displayCurrentUv(lon, lat, city);
            });
        } else {
            alert("Error:" + response.statusText);
        }
        })
        
        // if network error 
        .catch(function(error) {
            alert("Unable to connect to Open Weather");
    })
};


// Display UV
var displayCurrentUv = function(data) {
    var uv = data.value;
        if (uv >= 6) {
            currentUvEl.classList="badge badge-danger"
            currentUvEl.innerHTML=" " + uv + " ";
        } else if (uv > 3 ) {
            currentUvEl.classList="badge badge-warning"
            currentUvEl.innerHTML=" " + uv + " ";
        } else {
            currentUvEl.classList="badge badge-success"
            currentUvEl.innerHTML=" " + uv + " ";
        }
};


// 5 day forecast API 
var getForecast = function(city) {
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&cnt=6&appid=" + apiKey;

    // if response was successful 
    fetch(forecastURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayForecast(data.list);
            });
        } else {
            alert("Error:" + response.statusText);
        }
    })
    // if network error 
    .catch(function(error) {
        alert("Unable to connect to Open Weather");
    })
};


// Displaying 5 day forecast   
var displayForecast = function (list) { 
    console.log(list);

        for (var i = 0; i <= 4; i++) {
        console.log(`I ran this ${i + 1}times`)
        //date
        //creating HTML Elements
        var mainDiv = document.createElement('div')
        mainDiv.setAttribute('class', 'card col-2 mr-3' )
        mainDiv.setAttribute('id', `day-${i + 1}`)

        var dateEl = document.createElement('p')
        dateEl.setAttribute('class', 'card-1 text-white')
        dateEl.setAttribute('id', `date-${i}`)
        var forecastDate = moment().add(i + 1, "days").format("L");
        dateEl.textContent = forecastDate


        var imgEl = document.createElement('img')
        imgEl.setAttribute('id', `city-icon-${i + 1}` )
        var currentIcon = "https://openweathermap.org/img/wn/" + list[i + 1].weather[0].icon + "@2x.png"
        imgEl.setAttribute('src', currentIcon)

        var tempEl = document.createElement('p') 
        tempEl.setAttribute('class', 'card-1 text-white')
        tempEl.setAttribute('id', `temp-${i}`)
        var forecastTemp = "Temp: " + Math.round(list[i].main.temp) + " °F";
        tempEl.textContent = forecastTemp

        var humidityEl = document.createElement('p') 
        humidityEl.setAttribute('class', 'card-1 text-white')
        humidityEl.setAttribute('id', `humidity-${i}`)
        var forecastHumidity = "Humid: " + list[i].main.humidity + "%";
        humidityEl.textContent = forecastHumidity

        var windEl = document.createElement('p') 
        windEl.setAttribute('class', 'card-1 text-white')
        windEl.setAttribute('id', `wind-${i}`)
        var forecastWind = "Wind Speed: " + list[i].wind.speed + " mph";
        windEl.textContent = forecastWind
        

        fiveDayEl.appendChild(mainDiv)
        mainDiv.appendChild(dateEl)
        mainDiv.appendChild(imgEl)
        mainDiv.appendChild(tempEl)
        mainDiv.appendChild(humidityEl)
        mainDiv.appendChild(windEl)
        

        }
    }

    // Ability to click on previous searched city
var clickHandler = function (event) {

    var clickCity = event.currentTarget.textContent;

    getCityWeather(clickCity);
    getForecast(clickCity);
};

// Function to save recent search of city
var recentCity = function (searchTerm) {

    var newCityEl = document.createElement("li");
    newCityEl.className = "list-group-item";
    newCityEl.textContent = searchTerm;
    newCityEl.addEventListener("click", clickHandler);
    previousCityEl.appendChild(newCityEl); 

};

// Save in Local Storage
var saveRecentCity = function() {
    localStorage.setItem("city", JSON.stringify(cityArray));
}







   
// Form Search Button
  userFormEl.addEventListener("submit", formSubmitHandler);
  
  