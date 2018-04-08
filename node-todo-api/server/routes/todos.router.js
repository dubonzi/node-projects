const express = require('express');
const todoRouter = express.Router();
const { ObjectID } = require('mongodb');
const _ = require('lodash');

const { Todo } = require('../models/todo');
const { authenticate } = require('../middleware/authenticate');

todoRouter.post('/', authenticate, (req, res) => {
  let todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });
  todo.save().then((doc) => {
    res.send(doc);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

todoRouter.get('/:id', authenticate, (req, res) => {
  let id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  } else {
    Todo.findOne({ _id: id, _creator: req.user._id }).then((todo) => {
      todo ? res.send({ todo }) : res.status(404).send();
    }).catch((err) => {
      res.status(400).send();
    });
  };
});

todoRouter.get('/', authenticate, (req, res) => {
  Todo.find({ _creator: req.user._id }).then((todos) => {
    res.send({ todos })
  }).catch((err) => {
    res.status(400).send(err);
  });
});

todoRouter.delete('/:id', authenticate, (req, res) => {
  let id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  } else {
    Todo.findOneAndRemove({ _id: id, _creator: req.user._id }).then((todo) => {
      todo ? res.send({ todo }) : res.status(404).send();
    }).catch((err) => {
      res.status(400).send();
    });
  }
});

todoRouter.patch('/:id', authenticate, (req, res) => {
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

  Todo.findOneAndUpdate({ _id: id, _creator: req.user._id }, { $set: body }, { new: true }).then((todo) => {
    todo ? res.send({ todo }) : res.status(404).send();
  }).catch((err) => {
    res.status(400).send();
  });
});

module.exports = { todoRouter }