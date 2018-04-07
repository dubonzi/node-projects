require('dotenv').config();
const mongoose = require('mongoose');
const dbURI = process.env.NODE_ENV === 'test' ? process.env.MONGODB_URI_TEST : process.env.MONGODB_URI;

mongoose.Promise = global.Promise;
mongoose.connect(dbURI).then((mg) => {
  console.log('Connected to MongoDB Server');
}).catch((err) => {
  console.log('Could not connect to MongoDB Server', err);
});

module.exports = {
  mongoose
}