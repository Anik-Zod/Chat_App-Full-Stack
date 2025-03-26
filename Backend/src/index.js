import express from "express"
import dotenv from 'dotenv'
import {connectDB} from './lib/db.js'
import cookieParser from "cookie-parser"
import cors from 'cors'
import bodyParser from 'body-parser'; 

import authRoutes from "./routes/auth.route.js"
import messageRoutes from './routes/message.route.js'
import { app,server, } from "./lib/socket.js"
import groupRoutes from "./routes/group.route.js"

dotenv.config()

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

// Body parser configuration to handle large payloads
app.use(bodyParser.json({ limit: '50mb' })); // Set the max body size to 50MB (you can adjust this)
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/groups",groupRoutes)


const port = process.env.PORT
server.listen(port,()=>{
    console.log(`http://localhost:${port}`);
    connectDB()
})