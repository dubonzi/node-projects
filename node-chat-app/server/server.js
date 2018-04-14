const path = require('path');
const http = require('http');

const socketIO = require('socket.io');
const express = require('express');
const _ = require('lodash');

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.emit('newMessage', {from: 'Admin', text: 'Bem vindo ao chat!', createdAt: new Date().valueOf()});
  socket.broadcast.emit('newMessage', {from: 'Admin', text: 'Novo usuário conectado.', createdAt: new Date().valueOf()})

  socket.on('createMessage', (newMsg) => {
    let msg = _.pick(newMsg, ['from', 'text']);
    msg.createdAt = new Date().valueOf();
    io.emit('newMessage', msg);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});