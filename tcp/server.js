const net = require("net");
const database = require("../data.json");
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
  client.write("Enter command:");

  // // Menu for the rockets
  // let rocketList = "";
  // rocketsData.forEach((rocket, index) => {
  //   rocketList += `${index + 1}. ${rocket.name}\n`;
  // });

  // client.write(rocketList);

  client.on("data", (data) => {
    console.log(`Client says: [${data}]`);

    const commands = data.split(" ");
    if (commands[0].toLowerCase() === "get") {
      const key = Number(commands[1]);
      if (!database[key]) {
        return client.write("Invalid choice:");
      }

      // console.log(database[key]);
      client.write(database[key].description);
      return;
    }

    return client.write("Invalid command:");
  });

  client.on("end", () => {
    console.log("Client left");
  });
});

server.on("listening", () => {
  console.log("Listening");
});

// Once the server is up and running run the callback
server.listen(PORT, () => {
  console.log("Listening on port", PORT);
});