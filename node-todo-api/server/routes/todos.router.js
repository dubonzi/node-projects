const express = require('express');
const todoRouter = express.Router();
const { ObjectID } = require('mongodb');

const { Todo } = require('../models/todo');

todoRouter.post('/', (req, res) => {
  let todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    res.send(doc);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

todoRouter.get('/:id', (req, res) => {
  let id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  } else {
    Todo.findById(id).then((todo) => {
      todo ? res.send({ todo }) : res.status(404).send();
    }).catch((err) => {
      res.status(400).send();
    });
  };
});

todoRouter.get('/', (req, res) => {
  Todo.find().then((todos) => {
    res.send({ todos })
  }).catch((err) => {
    res.status(400).send(err);
  });
});

todoRouter.delete('/:id', (req, res) => {
  let id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  } else {
    Todo.findByIdAndRemove(id).then((todo) => {
      todo ? res.send({ todo }) : res.status(404).send();
    }).catch((err) => {
      res.status(400).send();
    });
  }
});

todoRouter.patch('/:id', (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(400).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
    todo ? res.send({ todo }) : res.status(404).send();
  }).catch((err) => {
    res.status(400).send();
  });
});

module.exports = { todoRouter }