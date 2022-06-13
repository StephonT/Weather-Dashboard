//API Key
var apiKey = "7c0b6aaecdbe620bab99fac8b7710966"


var getCityWeather = function(city) {
    // format the openweather api
   var currentWeatherUrl= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

   //make a request to url
   fetch(currentWeatherUrl).then(function(response) {
    response.json().then(function(data) {
        console.log(data);
    })
   })
    
}

  getCityWeather("Edison");
  
  