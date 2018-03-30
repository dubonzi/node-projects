const yargsCfg = require('../config/yargs-cfg');
const request = require('request');
const googleApiKey = process.env.GOOGLE_API_KEY;

let encodedAddress = encodeURIComponent(yargsCfg.argv.address);

const getGeocodeInfo = (callback) => {
  request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?key=${googleApiKey}&address=${encodedAddress}`,
      json: true
    }, (err, res, body) => {
      if (err) {
       callback('Cannot connect to Google servers.');
      } else if (body.status === 'ZERO_RESULTS') {
        callback('No results found for that address.');
      } else if (body.status === 'INVALID_REQUEST') {
        callback('Invalid request.');
      } else if (body.status === 'OK') {
        callback(null, {
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng,
        });
      };
  });
};

module.exports = {
  getGeocodeInfo
};