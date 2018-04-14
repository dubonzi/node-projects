const socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', (msg) => {
  let data = new Date(msg.createdAt).toLocaleTimeString();
  let li = jQuery('<li></li>');
  li.text(`[${data}] - ${msg.from}: ${msg.text}`);
  jQuery('#messages').append(li);

  logMessage(msg);
});

function sendMessage(user, message) {
  socket.emit('createMessage', {
    from: user,
    text: message
  }, (ack) => {
    console.log(ack);
  });
};

function logMessage(message) {
  let data = new Date(message.createdAt).toLocaleTimeString();

  console.log(`[${data}] - ${message.from} diz:`);
  console.log('%c' + message.text, 'color: green');
};

jQuery('#message-form').on('submit', (e) => {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, (ack) => {
    console.log(ack);
  });
});
