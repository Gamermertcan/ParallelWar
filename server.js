const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

io.on("connection", (socket) => {
  socket.on("start-war", (data) => {
    const delay = Math.random() * (30 - 5) + 5;
    const result = Math.random() > 0.5 ? "win" : "lose";

    setTimeout(() => {
      io.emit("war-result", { cell: data.cell, result });
    }, delay * 1000);
  });
});

server.listen(3000);
