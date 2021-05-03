// const - set for something that will not change
// let - set for code block specific functions
// var - can redefine any value to anything set with this decloratio

/*
      map, filter, sort, reduce, forEach - arrays method - study these methods

      
      */

//api key - taken from api host site and used to set location to where data will be fetched from
var apiKey = "1c207b2a39ad8ece98f03bf1ac2c94bb";

// submit button
// looking in document for an id of search - setting an event listener of submit, once input from search button is submitted, then function event runs
document.querySelector("#search").addEventListener("submit", function (event) {
  // prevent dafault, when search button is clicked, user input remains
  event.preventDefault();

  //capture user input
  // looking in document for an id of userInput, the value is what user types in
  var userInput = document.querySelector("#userInput").value;
  //show cureent weather
  // what user enters will run function later in script
  currentWeather(userInput);
  //show forcast weather info
  // what user enters will run function later in script
  forecast(userInput);

  //create city button
  // what user enters will run function later in script and display below search bar
  createCityBtn(userInput);
});

// this function allows user input to be displayed below search bar based on the city user entered
const createCityBtn = function (cityName) {
  // new city button - dynamically creating element in html
  const newCityBtn = document.createElement("button");
  // setting value to attrubute to convert to html the class is city-btn
  newCityBtn.setAttribute("class", "city-btn");
  // the city button will display text to user once cityName (user input)
  newCityBtn.textContent = cityName;
  // looking in document for an id of city-bth-container, the container is created in html directly and append will dynamacally to html from JS for user to see
  document.querySelector("#city-btn-container").append(newCityBtn);
};

// create cityBtn button functionality
// looking in document for an id of city-btn-container
document
  .querySelector("#city-btn-container")
  // adding an event listener of click to the cityBtn inside of container created in html to execute function
  .addEventListener("click", function (event) {
    // if the event click on the tatget button (cityBtn) if the target (cityBtn) has  data index of greater than -1 then current weather and forcast function will execute and display weather data
    if (event.target.className.indexOf("city-btn") > -1) {
      //show current weather
      // this function will listen for the click event on the target button (cityBtn) and display the content to user on HTML
      currentWeather(event.target.textContent);
      //show forcast weather info
      // this function will listen for the click event on the target button (cityBtn) and display the content to user on HTML
      forecast(event.target.textContent);
    }
  });

// the var current weather is the data pulled from user input, user input of what city user is searching
var currentWeather = function (cityName) {
  // var url is the api of where the data is pulled from anything inbetween ${} are placeholders, these will be replaced by the user unput and api key replaced by the specicific key given from open weather set in global variable at begining of script
  // be sure to look up proper units of measurement and how to properly add to url.
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;

  // fetch(url) uses the url provided in var above to get data, this returns a promise and has 3 states, pending, rejected, and resolved. the promise means that some data will be returned based on server access, speed of return will vary. This is an aysyncronous method, meaning that it will not break code while waiting for response
  fetch(url)
    // res - resolution to fetch promise is also a response
    // once fetch request is resolved then res function is executed, this will return resolved status and turn the data recieved into JS readable using JSON
    .then(function (res) {
      return res.json();
    })
    // once data is recieved and JSON formatted, the data can be displayed in the browsers console
    .then(function (data) {
      console.log(data);

      //create a tempalte
      // writing string to convert to html
      // cannot comment inside template, this method is called templat literal using tic marks ``. HTMl is inserted inbetween tic marks `` to dynamacally create HTML and display to user. using ${} placeholders, will need to use data displayed in the console to use dot notation to select what needs to be displayed in HTML ex: data.name - the data recieved, and the name of the city
      // within the img element, look in open weather maps docs to find out what image needs to be used and how the syntax is laid out ex: data.weather[0].icon will display proper icon in relation to weather in area searched
      // for temp, humidity and wind speed. will need to look in console from data fethced and traverse using dot notation to select and dispalay proper information.
      const template = `
            <div class="card">
                <div class="card-body">
                    <h2>
                        ${data.name} (${new Date().toLocaleDateString()})
                        <img src="https://openweathermap.org/img/w/${
                          data.weather[0].icon
                        }.png">
                    </h2>
                    <p>Temp: ${data.main.temp} F</p>
                    <p>Humidity: ${data.main.humidity} %</p>
                    <p>Wind Speed: ${data.wind.speed} mph</p>
                </div>
            </div>
        `;

      //add tempalte the page and convert to html

      // looking in documemnt and selecting an element with the id of current-weather. innerHTML converts the template into html, it also replaces or adds content of container with the template,
      document.querySelector("#current-weather").innerHTML = template;
    });
};

// this displays the forecast see notes above ^^^ and apply forcast specific url and add proper units of measurement
var forecast = function (cityName) {
  var url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`;

  // fetching data from forcast specific URL see notes above ^^^
  fetch(url)
    // res - resolution to fetch promise is also a response
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);

      // filter returns a new array and can store in a new var/const
      // using dot notation, look at data in browser console, traverse down to specific data that I want selected for user to see and have it set parameter as list item
      const filterArray = data.list.filter(function (listItem) {
        // once dot notation is used to select what data I want displayed, use indexOF method and pass in the data I want to sort through and select
        // I want to show in forecast weather at 1500 - if indexOf("15:00:00") has an index of more than -1 then return true (show up in my sort list) else return false(do not show in my list)
        if (listItem.dt_txt.indexOf("15:00:00") > -1) {
          return true;
        } else {
          return false;
        }
      });
      // logging the const filterArray to show and test that I got the correct output and display in brower console.
      console.log(filterArray);

      //create a tempalte
      // writing string to convert to html
      // template value set to empty string so i can pass in however many copies as i want to the value.
      let template = "";
      // forEach
      // the array that I filtered. for each item run the function
      filterArray.forEach(function (data) {
        // += means - return and convert to HTML the same template and data keep adding plus one, until max array items reached (5),
        template += `
                  <div class="card">
                      <div class="card-body">
                          <h2>
                              ${data.dt_txt})
                              <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
                          </h2>
                          <p>Temp: ${data.main.temp} F</p>
                          <p>Humidity: ${data.main.humidity} %</p>
                          <p>Wind Speed: ${data.wind.speed} mph</p>
                      </div>
                  </div>
              `;
      });

      //add tempalte the page and convert to html

      // innerHTML converts the template into html, it also replaces content of container with the template
      document.querySelector("#forecast").innerHTML = template;
    });
};

// save user input to local storage
//store in local storage - understand shape and design of data

// add event listener to submit btn to handle local store data
// looking for an element with the id of search, adding event listener "click" once clicked, the function runs.
document.querySelector("#search").addEventListener("click", function () {
  //save information
  //event.preventDefault();
  //get user input city
  //json is not JS readable, so parse turns in into JS readable, getting the item of the input

  var userCity = document.querySelector("#userInput").value;

  //build obj - data - what user inputs

  // this does not need object because there is only one input item
  /*var data = {
    name: userCity,
  };*/

  //add into the info array
  //save it - this is going to local storage, settign the input from city user inputs stringify turns JSON object (parse) to regulas JSON

  var userInput = JSON.parse(localStorage.getItem("userInput")) || [];
  userInput.push(userCity);
  localStorage.setItem("userInput", JSON.stringify(userInput));
});
