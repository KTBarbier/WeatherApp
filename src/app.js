let now = new Date();

function formatDate() {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let todaysDate = now.getDate();
  let year = now.getFullYear();

  let liToday = document.querySelector("#current-date");
  liToday.innerHTML = `${day} ${month} ${todaysDate} ${year}`;
}
formatDate();

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

let liTime = document.querySelector("#current-time");
liTime.innerHTML = formatAMPM(new Date());

function getForecast(coordinates) {
  let apiKey = "65d2465365ff42d62007012b620803eb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function showData(response) {
  let city = document.querySelector("h1");
  let mainTempDisplay = document.querySelector("#current-temp");
  let conditions = document.querySelector("#description");
  let feelsLike = document.querySelector("#real-feel");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#main-icon");

  fahrenheitTemp = response.data.main.temp;

  city.innerHTML = response.data.name;
  mainTempDisplay.innerHTML = Math.round(fahrenheitTemp) + "°";
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

  getForecast(response.data.coord);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-4">
    <div class="card">
    <div class="card-body">
    <img
    src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
    alt=""
    class="icons"
    />
    <h6>${formatDay(forecastDay.dt)}</h6>
    <p class="daily-info">
    ${forecastDay.weather[0].main}<br />${Math.round(
          forecastDay.temp.max
        )}° / ${Math.round(forecastDay.temp.min)}° F<br />
      </p>
      </div>
      </div>
      </div>
      `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

search("Houston");
