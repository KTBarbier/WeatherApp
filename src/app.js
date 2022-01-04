let now = new Date();

function formatDate() {
  let days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  let months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "nov",
    "december",
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

//function changeDisplayCity(event) {
//  event.preventDefault();
//  let input = document.querySelector("#city-search");
//  let h1 = document.querySelector("h1");
//  h1.innerHTML = input.value;
//}

//let form = document.querySelector("form");
//form.addEventListener("submit", changeDisplayCity);

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
  humidity.innerHTML = "humidity: " + response.data.main.humidity + "%";
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
