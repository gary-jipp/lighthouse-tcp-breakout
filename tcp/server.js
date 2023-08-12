const net = require("net");
const PORT = 3000;

// First creating the server
const server = net.createServer();

// Notify once a connection is made to our server
server.on("connection", (client) => {

  console.log(client.constructor.name);  // Socket

  // Tell net that incoming data is printable text
  client.setEncoding("utf8");
  console.log("Someone connected!");


  // Once a client sends data, console.log it
  client.write("Welcome to our server:\n");
  client.write("Enter a command:");

  // // Menu for the rockets
  // let rocketList = "";
  // rocketsData.forEach((rocket, index) => {
  //   rocketList += `${index + 1}. ${rocket.name}\n`;
  // });

  // client.write(rocketList);

  client.on("data", (data) => {
    console.log(`Client says: [${data}]`);
    // const rocketIndex = Number(data) - 1;

    // const selectedRocket = rocketsData[rocketIndex];

    client.write("Message received: " + data);
  });

  client.on("end", ()=>{
    console.log("Client left");
  })
});

server.on("listening", () => {
  console.log("Listening");
});

// Once the server is up and running run the callback
server.listen(PORT, () => {
  console.log("Listening on port", PORT);
});