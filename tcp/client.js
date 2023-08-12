const net = require("net");

const config = {
  port: 3000,
  host: "127.0.0.1"
};

const socket = net.createConnection(config);

console.log(socket.constructor.name);  // Socket

socket.setEncoding("utf8");

socket.on("connect", (data) => {
  console.log("Connected to Server");
});

socket.on("data", (data) => {
  console.log(`${data}`);
});

socket.on("end", () => {
  console.log("Disconnect");
  process.exit();
});

process.stdin.on("data", (key) => {
  socket.write(key);
});