const path = require('path');
const http = require('http');

const socketIO = require('socket.io');
const express = require('express');
const _ = require('lodash');

const { generateMessage } = require('./utils/message');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.emit('newMessage', generateMessage('Admin', 'Bem vindo ao chat!'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'Novo usuário conectado.'));

  socket.on('createMessage', (newMsg, callback) => {
    if (_.has(newMsg, 'from') && _.has(newMsg, 'text')) {
      let msg = _.pick(newMsg, ['from', 'text']);
      io.emit('newMessage', generateMessage(msg.from, msg.text));
    } else {
      callback('Mensagem inválida');
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});