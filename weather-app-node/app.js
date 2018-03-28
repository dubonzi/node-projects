require('dotenv').config();
const request = require('request');
const googleApiKey = process.env.GOOGLE_API_KEY;

request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?key=${googleApiKey}&address=avenida%20paulista%20s%C3%A3o%20paulo%20650`,
  json: true
}, (err, res, body) => {
  console.log(JSON.stringify(body, null, 2));
})
