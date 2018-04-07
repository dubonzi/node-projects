const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URL).then((mg) => {
  console.log('Connected to MongoDB Server');
}).catch((err) => {
  console.log('Could not connect to MongoDB Server');
});

module.exports = {
  mongoose
}