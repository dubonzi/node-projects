require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');

const { todoRouter } = require('./routes/todos.router');
const { userRouter } = require('./routes/user.router');

const app = express();
const port = process.env.PORT;
app.use(bodyParser.json());

app.use('/todos', todoRouter);
app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = { app }