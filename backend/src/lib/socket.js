import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["https://fullstack-chat-app-idtb.vercel.app"],
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

const userSocketMap = {};
const socketUserMap = {}; // Map socket IDs to user IDs for cleanup

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  
  if (userId) {
    userSocketMap[userId] = socket.id;
    socketUserMap[socket.id] = userId;
    
    // Update user status to online
    socket.broadcast.emit("userStatusChanged", { userId, status: "online" });
    
    console.log(`User ${userId} connected with socket ${socket.id}`);
  }
  
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    
    // Clean up user mapping
    const disconnectedUserId = socketUserMap[socket.id];
    if (disconnectedUserId) {
      delete userSocketMap[disconnectedUserId];
      delete socketUserMap[socket.id];
      
      // Update user status to offline
      socket.broadcast.emit("userStatusChanged", { userId: disconnectedUserId, status: "offline" });
      
      console.log(`User ${disconnectedUserId} disconnected`);
    }
    
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });

  // Handle explicit logout
  socket.on("logout", (userId) => {
    console.log(`User ${userId} logged out`);
    if (userSocketMap[userId]) {
      delete userSocketMap[userId];
      
      // Find and remove from socketUserMap
      const socketId = Object.keys(socketUserMap).find(
        key => socketUserMap[key] === userId
      );
      if (socketId) {
        delete socketUserMap[socketId];
      }
      
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
      socket.broadcast.emit("userStatusChanged", { userId, status: "offline" });
    }
  });
});

export { io, app, server };
