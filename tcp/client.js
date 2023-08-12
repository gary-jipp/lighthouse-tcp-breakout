const net = require("net");

const config = {
  port: 3000,
  host: "127.0.0.1"
};

const client = net.createConnection(config);

console.log(client.constructor.name);  // Socket

client.setEncoding("utf8");

client.on("connect", (data) => {
  console.log("Connected to Server");
});

client.on("data", (data) => {
  console.log(`${data}`);
});

process.stdin.on("data", (key) => {
  client.write(key);
});