import express from "express"
import dotenv from 'dotenv'
import {connectDB} from './lib/db.js'
import cookieParser from "cookie-parser"
import cors from 'cors'

import authRoutes from "./routes/auth.route.js"
import messageRoutes from './routes/message.route.js'

dotenv.config()
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)


const port = process.env.PORT
app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
    connectDB()
})