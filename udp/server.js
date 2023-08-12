const UDP = require('dgram');
const port = 2222;

const server = UDP.createSocket('udp4');

server.on('message', (message, info) => {
  console.log('Message', message.toString());

  // sending back response to client
  const response = Buffer.from('Message Received');
  server.send(response, info.port, info.address, err => {
    if (err) {
      return console.error('Failed to send response !!');
    }

    console.log('Response sent');
  });
});

//  This is more common
server.on('listening', () => {
  const address = server.address();
  console.log('Listening on Port: ', address.port);
});

// Callback here is not that useful. Usually we use the listening event
server.bind(port, () => {
  console.log("Listening on UDP Port", port);
});