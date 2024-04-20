process.env.DEBUG = "socket.io:*";
//process.env.DEBUG = "*";

import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

interface Client {
  id: string;
  x: string;
  y: string;
}
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const allClients: Client[] = [];

app.use(express.static(__dirname + "/view"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/view/index.html");
});
// middleware for socket.io
io.use((socket, next) => {
  // add middleware berfore connection
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error("invalid token"));
  } else {
    if (token === "123") {
      next();
    } else {
      return next(new Error("invalid token"));
    }
  }
});
io.use((socket, next) => {
  //dummy middleware
  next();
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
});

app.get("/data", (req, res) => {
  res.json({ message: "Hello World" });
});

httpServer.listen(3000); // Listen on port 3000 for used socket.io
