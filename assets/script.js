var apiKey = "1c207b2a39ad8ece98f03bf1ac2c94bb";

document.querySelector("#search").addEventListener("submit", function (event) {
  event.preventDefault();

  //capture user input
  var userInput = document.querySelector("#userInput").value;
  //show cureent weather
  currentWeather(userInput);
  //show forcast weather info
  //forecast(userInput);
});

var currentWeather = function (cityName) {
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
    });
};
