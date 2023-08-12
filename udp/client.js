const UDP = require('dgram');

const client = UDP.createSocket('udp4');
const port = 2222;
const hostname = 'localhost';

const message = Buffer.from('This is a message from client');
client.send(message, port, hostname, (err) => {
  if (err) {
    return console.error('Failed to send packet !!');
  }

  console.log('Packet send !!');
});

client.on('message', (message, info) => {
  // info contains information about the mseeage
  console.log(info);

  console.log('Address: ', info.address, 'Port: ', info.port, 'Size: ', info.size);

  // read message from server
  console.log('Message from server', message.toString());
});