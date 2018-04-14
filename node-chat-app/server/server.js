const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const socketIO = require('socket.io');

const express = require('express');

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.emit('newMessage', {
    from: 'Eduardo',
    text: 'Mensagem teste',
    createdAt: new Date().valueOf()
  });

  socket.on('createMessage', (msg) => {
    msg.createdAt = new Date().valueOf();
    console.log('createMessage', msg);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
})