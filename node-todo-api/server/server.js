require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();
app.use(bodyParser.json());

const port = 3000 || process.env.PORT;

app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    res.send(doc);
  }).catch((err) => {
    res.status(400).send(err);
  });
});


app.get('/todos', (req, res) => {
  Todo.find().then((docs) => {
    res.send({ todos: docs })
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = { app }