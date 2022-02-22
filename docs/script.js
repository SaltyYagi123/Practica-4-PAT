// Making a map and tile
const mymap = L.map("issMap").setView([0, 0], 1);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

// Making a marker with a custom icon
const issIcon = L.icon({
  iconUrl: "international-space-station.png",
  iconSize: [50, 32],
  iconAnchor: [25, 16],
});
const marker = L.marker([0, 0], { icon: issIcon }).addTo(mymap);

const api_url = "https://api.wheretheiss.at/v1/satellites/25544";

let firstTime = true;

async function getISS() {
  const response = await fetch(api_url);
  const data = await response.json();
  const { latitude, longitude } = data;

  marker.setLatLng([latitude, longitude]);
  if (firstTime) {
    mymap.setView([latitude, longitude], 2);
    firstTime = false;
  }
  //Fixes the number of decimal places
  document.getElementById("lat").textContent = latitude.toFixed(2);
  document.getElementById("lon").textContent = longitude.toFixed(2);
}

getISS();

async function getWeatherLoc() {
  const response = await fetch(api_url);
  const data = await response.json();
  const { latitude, longitude } = data;

  const weather_api_key = "eee50db85c0ba5c874076d3e70632afa";

  let weather_api_url = "https://api.openweathermap.org/data/2.5/weather?lat=";
  weather_api_url += latitude.toFixed(2);
  weather_api_url += "&lon=";
  weather_api_url += longitude.toFixed(2);
  weather_api_url += "&appid=";
  weather_api_url += weather_api_key;

  console.log(weather_api_url);

  const response_weather = await fetch(weather_api_url);
  const weather_data = await response_weather.json();

  //Fixes the number of decimal places
  const {
    coords,
    weather,
    base,
    main,
    visibility,
    wind,
    clouds,
    dt,
    sys,
    timezone,
    id,
    name,
    cod,
  } = weather_data;

  let temperature = main.temp;
  temperature -= 273.15;

  let temp_max = main.temp_max;
  temp_max -= 273.15;

  let temp_min = main.temp_min;
  temp_min -= 273.15;

  document.getElementById("temp").textContent = temperature.toFixed(2);
  document.getElementById("tiempo").textContent = weather[0].main;
  document.getElementById("humidity").textContent = main.humidity;
  document.getElementById("maximo").textContent = temp_max.toFixed(2);
  document.getElementById("minimo").textContent = temp_min.toFixed(2);
}

getWeatherLoc();

setInterval(getISS, 1000);
setInterval(getWeatherLoc, 10000);
