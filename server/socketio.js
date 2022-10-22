const express = require("express");
const app = express();

// import the HTTP and the CORS library to allow data transfer between the client and the server domains.
const http = require("http").Server(app);
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

//  the socket.io("connection") function establishes a connection with the React app, then creates a unique ID for each socket and logs the ID to the console whenever a user visits the web page
socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("🔥: A user disconnected");
  });
});
