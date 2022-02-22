// Making a map and tile
const mymap = L.map("issMap").setView([0, 0], 1);

const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

const weather_api_key = "eee50db85c0ba5c874076d3e70632afa";

// Making a marker with a custom icon
const issIcon = L.icon({
  iconUrl: "../icons/international-space-station.png",
  iconSize: [50, 32],
  iconAnchor: [25, 16],
});
const marker = L.marker([0, 0], { icon: issIcon }).addTo(mymap);

const api_url = "https://api.wheretheiss.at/v1/satellites/25544";

const weather = {};

const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");

weather.temperature = {
  unit : "celsius"
}

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

  let weather_api_url = "https://api.openweathermap.org/data/2.5/weather?lat=";
  weather_api_url += latitude.toFixed(2);
  weather_api_url += "&lon=";
  weather_api_url += longitude.toFixed(2);
  weather_api_url += "&appid=";
  weather_api_url += weather_api_key;

  console.log(weather_api_url);

  fetch(weather_api_url)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - 273.15);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}

function displayWeather(){
  iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
  tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
  descElement.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// C to F conversion
function celsiusToFahrenheit(temperature){
  return (temperature * 9/5) + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});



getWeatherLoc();

setInterval(getISS, 1000);
setInterval(getWeatherLoc, 10000);
