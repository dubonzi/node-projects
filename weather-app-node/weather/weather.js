const request = require('request');
const forecastApiKey = process.env.FORECAST_IO_API_KEY;

function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) / 1.8).toPrecision(2);
}

const getWeather = (location, callback) => {
  request({
    url: `https://api.darksky.net/forecast/${forecastApiKey}/${location.lat},${location.lng}`,
    json: true
  }, (err, res, body) => {
    if (!err && res.statusCode === 200) {
      let temperature = toCelsius(body.currently.temperature);
      let apparentTemperature = toCelsius(body.currently.apparentTemperature);
      let precipChance = body.currently.precipProbability * 100;
      
      let result = {
        temperature,
        apparentTemperature,
        precipChance
      };
      callback(null, result);
    } else {
      return 'Unable to fetch weather.';
    }
  });
};

module.exports = {
  getWeather
};