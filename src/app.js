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
  let celciusTemperature = ((fahrenheitTemp - 32) * 5) / 9;
  tempElement.innerHTML = Math.round(celciusTemperature);
  //remove active from f
  fahrenheitLink.classList.remove("active");
  celciusLink.classList.add("active");
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#current-temp");
  tempElement.innerHTML = Math.round(fahrenheitTemp);
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

let celciusLink = document.querySelector("#c-link");
celciusLink.addEventListener("click", convertToCelcius);

let fahrenheitLink = document.querySelector("#f-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function showData(response) {
  console.log(response);
  let city = document.querySelector("h1");
  let mainTempDisplay = document.querySelector("#current-temp");
  let conditions = document.querySelector("#description");
  let feelsLike = document.querySelector("#real-feel");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#main-icon");

  fahrenheitTemp = response.data.main.temp;

  city.innerHTML = response.data.name;
  mainTempDisplay.innerHTML = Math.round(fahrenheitTemp);
  conditions.innerHTML = response.data.weather[0].main;
  feelsLike.innerHTML =
    "Feels like: " + Math.round(response.data.main.feels_like) + "°";
  humidity.innerHTML = "Humidity: " + response.data.main.humidity + "%";
  windSpeed.innerHTML =
    "Wind speed: " + Math.round(response.data.wind.speed) + " mph";
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

let fahrenheitTemp = null;

search("Houston");
