const socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', (msg) => {
  let data = new Date(msg.createdAt).toLocaleTimeString();

  console.log(`${data} Nova mensagem de ${msg.from}:`);
  console.log(msg.text);
});