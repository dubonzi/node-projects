const socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', (msg) => {
  let data = new Date(msg.createdAt).toLocaleTimeString();

  console.log(`[${data}] - ${msg.from} diz:`);
  console.log('%c' + msg.text, 'color: green');
});

function mensagem(usuario, mensagem) {
  socket.emit('createMessage', {
    from: usuario,
    text: mensagem
  });
}