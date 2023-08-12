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
  client.write("Enter command:");

  // // Menu for the rockets
  // let rocketList = "";
  // rocketsData.forEach((rocket, index) => {
  //   rocketList += `${index + 1}. ${rocket.name}\n`;
  // });

  // client.write(rocketList);

  client.on("data", (data) => {
    console.log(`Client says: [${data}]`);

    const lines = data.split("\r\n");
    const command = lines[0].split(" ");

    if (command[0].toLowerCase() === "get") {
      const key = command[1];
      if (!database[key]) {
        console.log("Invalid choice:");
        return client.write("Invalid choice:");
      }

      client.write(database[key].description);
      // client.end(); // Needed for Browser Testing
      return;
    }

    console.log("Invalid command:");
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