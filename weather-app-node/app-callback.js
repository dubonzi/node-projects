require('dotenv').config();
const request = require('request');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

geocode.getGeocodeInfo((errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(results.address);
    let location = {
      lat: results.latitude,
      lng: results.longitude
    };
    weather.getWeather(location, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`It's currently ${weatherResults.temperature}, but it feels like ${weatherResults.apparentTemperature}.`);
        console.log(`There's a ${weatherResults.precipChance}% chance of raining.`);
      }
    });
  }
});

let location = {
  lat: -21.778533,
  lng: -41.313475,
}