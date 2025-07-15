import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["https://chat-app-full-stack-u4xj.vercel.app"],
  },
});



export function getReceiverSocketId(userId){
  return userSocketMap[userId]
}

//used to store online users 
const userSocketMap = {}; // {userId : socketId}




io.on("connection", (socket) => {
  console.log("A User Connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id

  io.emit("getOnlineUsers",Object.keys(userSocketMap))

  //Handling typing events
  socket.on("typing", ({ senderId, receiverId }) => {
    const receiverSocketId = userSocketMap[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("userTyping", { senderId });
    }
  });

  socket.on("stopTyping",({senderId,receiverId})=>{
    const receiverSocketId = userSocketMap[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("userStoppedTyping", { senderId });
    }
  })




  socket.on("disconnect", () => {
    console.log("A User Disconnected", socket.id);
     
    delete userSocketMap[userId];
    io.emit("getOnlineUsers",Object.keys(userSocketMap));
  });
});

export { io, app, server };
