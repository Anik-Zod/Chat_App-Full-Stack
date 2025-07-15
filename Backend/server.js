import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";

import authRoutes from "./src/routes/auth.route.js";
import messageRoutes from "./src/routes/message.route.js";
import { app, server } from "./src/lib/socket.js";
import groupRoutes from "./src/routes/group.route.js";

dotenv.config();

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(
  cors({
    origin: [
      "https://chat-app-full-stack-u4xj.vercel.app", // ✅ Frontend prod
      "http://localhost:5173",                        // ✅ Local dev
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parser configuration to handle large payloads
app.use(bodyParser.json({ limit: "50mb" })); // Set the max body size to 50MB (you can adjust this)
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("/auth", authRoutes);
app.use("/messages", messageRoutes);
app.use("/groups", groupRoutes);
app.use("/", (req, res) => {
  return res.json({ message: "Server running" });
});

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`http://localhost:${port}`);
  connectDB();
});
