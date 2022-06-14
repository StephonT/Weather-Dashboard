//API Key
var apiKey = "7c0b6aaecdbe620bab99fac8b7710966"

var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#cityname");
var currentContainerEl = document.querySelector("#current-container")
var citySearchTerm = document.querySelector("#city-search-term")
var currentDateEl = document.querySelector("#city-current-date")
var currentIconEl = document.querySelector("#city-current-icon")
var fiveDayEl = document.querySelector("#forecast-cards");
var searchContainerEl = document.getElementById("search-container");
var currentUvEl = document.querySelector("#uv-input")

var cityArray = [];


//Function that will execute upon form submission

var formSubmitHandler = function(event) {
    event.preventDefault();

    //get value from input element
    var cityname = cityInputEl.value.trim();

    if(cityname) {
        getCityWeather(cityname);
        getForecast(cityname)

        // Push city name into Array in Local Storage
        cityArray.push(cityname);
        localStorage.setItem("cityname", JSON.stringify(cityArray));
        localStorage.getItem("citname");

        document.getElementById("search-container").textContent = cityArray;
        

        // Empty City Search Bar
        cityInputEl.value= "";
        
    } else {
        alert("Please enter city name")
    }

    //Set local Storage to search value text
  localStorage.setItem('searchText', cityname)

 // If local storage is full run populate with saved city text. (for reload)
if(searchTerm !== null){
    console.log(searchTerm)
    var text = searchTerm
    populate(text)
  }

  
    
  console.log(event);
};





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

// display UV
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

        //date
        var displayDate1 = document.querySelector("#date-0");
        var forecastDate1 = moment().add(1, "days").format("L");
        displayDate1.textContent = forecastDate1;

        var displayDate2 = document.querySelector("#date-1");
        var forecastDate2 = moment().add(2, "days").format("L");
        displayDate2.textContent = forecastDate2;

        var displayDate3 = document.querySelector("#date-2");
        var forecastDate3 = moment().add(3, "days").format("L");
        displayDate3.textContent = forecastDate3;

        var displayDate4 = document.querySelector("#date-3");
        var forecastDate4 = moment().add(4, "days").format("L");
        displayDate4.textContent = forecastDate4;

        var displayDate5 = document.querySelector("#date-4");
        var forecastDate5 = moment().add(5, "days").format("L");
        displayDate5.textContent = forecastDate5;

        // temp
        var displayTemp = document.querySelector(`#temp-${i}`);
        var forecastTemp = list[i].main.temp + " °F";
        displayTemp.textContent = forecastTemp; 

        //humidity
        var displayHumidity = document.querySelector(`#humidity-${i}`);
        var forecastHumidity = list[i].main.humidity + "%";
        displayHumidity.textContent = forecastHumidity;
        
        // weather icons 
        var displayIcon1 = document.querySelector("#city-icon-1");
        var currentIcon1 = "https://openweathermap.org/img/wn/" + list[1].weather[0].icon + "@2x.png"
        displayIcon1.setAttribute ("src", currentIcon1);

        var displayIcon2 = document.querySelector("#city-icon-2");
        var currentIcon2 = "https://openweathermap.org/img/wn/" + list[2].weather[0].icon  + "@2x.png"
        displayIcon2.setAttribute ("src", currentIcon2);

        var displayIcon3 = document.querySelector("#city-icon-3");
        var currentIcon3 = "https://openweathermap.org/img/wn/" + list[3].weather[0].icon  + "@2x.png"
        displayIcon3.setAttribute ("src", currentIcon3);

        var displayIcon4 = document.querySelector("#city-icon-4");
        var currentIcon4 = "https://openweathermap.org/img/wn/" + list[4].weather[0].icon  + "@2x.png"
        displayIcon4.setAttribute ("src", currentIcon4);

        var displayIcon5 = document.querySelector("#city-icon-5");
        var currentIcon5 = "https://openweathermap.org/img/wn/" + list[5].weather[0].icon  + "@2x.png"
        displayIcon5.setAttribute ("src", currentIcon5);

        }
    }

   

  userFormEl.addEventListener("submit", formSubmitHandler);
  
  