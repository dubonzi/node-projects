require('dotenv').config();
const axios = require('axios');
const yargsCfg = require('./config/yargs-cfg');
const googleApiKey = process.env.GOOGLE_API_KEY;
const forecastApiKey = process.env.FORECAST_IO_API_KEY;

function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) / 1.8).toPrecision(2);
}

let encodedAddress = encodeURIComponent(yargsCfg.argv.address);
let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${googleApiKey}&address=${encodedAddress}`;

axios.get(geocodeUrl).then((res) => {
  if (res.data.status === 'ZERO_RESULTS') {
    throw new Error('No results found for that address.');
  } else if (res.data.status === 'INVALID_REQUEST') {
    throw new Error('Invalid request.');
  } else if (res.data.status === 'OK') {
    let lat = res.data.results[0].geometry.location.lat;
    let lng = res.data.results[0].geometry.location.lng;
    let weatherUrl = `https://api.darksky.net/forecast/${forecastApiKey}/${lat},${lng}`;

    console.log(res.data.results[0].formatted_address);
    return axios.get(weatherUrl);
  };
}).then((weatherRes) => {
  let temperature = toCelsius(weatherRes.data.currently.temperature);
  let apparentTemperature = toCelsius(weatherRes.data.currently.apparentTemperature);
  let precipChance = weatherRes.data.currently.precipProbability * 100;
  console.log(`It's currently ${temperature}°C, but feels like ${apparentTemperature}°C`);
  console.log(`There's a ${precipChance}% chance of raining.`);
  //console.log(`There's a ${`)
}).catch((err) => {
  if (err.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers.');
  } else {
    console.log(err.message);
  }
});