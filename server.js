const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());

const onlineUsers = new Set();

io.on("connection", (socket) => {
  socket.on("login", (username) => {
    onlineUsers.add(username);
    io.emit("onlineUsers", Array.from(onlineUsers));
  });

  socket.on("message", (message) => {
    io.emit("message", message);
  });

  socket.on("logout", (username) => {
    onlineUsers.delete(username);
    io.emit("onlineUsers", Array.from(onlineUsers));
  });

  socket.on("disconnect", () => {
    onlineUsers.forEach((user) => {
      if (!io.sockets.sockets.has(user)) {
        onlineUsers.delete(user);
      }
    });
    io.emit("onlineUsers", Array.from(onlineUsers));
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});