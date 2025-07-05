import { Server } from "socket.io";
import http from "http";
import express from "express";
const app = express();
const server = http.createServer(app);
const socketMap = {};
export function getReceiverId(userId) {
  return socketMap[userId];
}
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});
io.on("connection", (socket) => {
  console.log("A User Connected:", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) socketMap[userId] = socket.id;
  io.emit("getOnlineUser", Object.keys(socketMap));
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
    delete socketMap[userId];
    io.emit("getOnlineUser", Object.keys(socketMap));
  });
});
export { io, app, server };
