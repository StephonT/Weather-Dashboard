//API Key
var apiKey = "7c0b6aaecdbe620bab99fac8b7710966"


var getCityWeather = function() {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=Newark&appid=" + apiKey);
  };

  getCityWeather();
  
  