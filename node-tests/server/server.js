const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(404).send({
    erro: 'Not found.',
    name: 'App 1.0'
  });
});

app.get('/users', (req, res) => {
  let users = [];
  users.push({name: 'Eduardo', age: 27});
  users.push({name: 'Carlos', age: 33});
  users.push({name: 'Marcelo', age: 40});

  res.json(users);
});

app.listen(3000, () => {
  console.log('Running on port 3000.');
});

module.exports.app = app;