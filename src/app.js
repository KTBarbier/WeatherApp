let now = new Date();

function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let todaysDate = now.getDate();
  let year = now.getFullYear();

  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  let liToday = document.querySelector("#current-date");
  liToday.innerHTML = `${day} ${month} ${todaysDate} ${year}`;
  let liTime = document.querySelector("#current-time");
  liTime.innerHTML = `${hour}:${minute}`;
}
formatDate();

function convertToCelcius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#current-temp");
  let temp = tempElement.innerHTML;
  tempElement.innerHTML = Math.round(((temp - 32) * 5) / 9);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#current-temp");
  let temp = tempElement.innerHTML;
  tempElement.innerHTML = Math.round((temp * 9) / 5 + 32);
}

let celciusLink = document.querySelector("#c-link");
celciusLink.addEventListener("click", convertToCelcius);

let fahrenheitLink = document.querySelector("#f-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

//Week 5: searching city and receiving accurate weather data

function showData(response) {
  console.log(response);
  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;
  let mainTempDisplay = document.querySelector("#current-temp");
  mainTempDisplay.innerHTML = Math.round(response.data.main.temp);
  let conditions = document.querySelector("#description");
  conditions.innerHTML = response.data.weather[0].main;
  let feelsLike = document.querySelector("#real-feel");
  feelsLike.innerHTML =
    "Feels like: " + Math.round(response.data.main.feels_like) + "°";
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = "Humidity: " + response.data.main.humidity + "%";
  let iconElement = document.querySelector("#main-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function search(city) {
  let units = "imperial";
  let apiKey = "65d2465365ff42d62007012b620803eb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showData);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  search(city);
}

let searchForm = document.querySelector("#search-bar");
searchForm.addEventListener("submit", handleSubmit);

search("Houston");
