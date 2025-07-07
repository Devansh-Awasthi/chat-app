import express  from "express";
import dotenv from 'dotenv';
import auth from "./routes/auth.routes.js"
import { connection_db } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
import messageRoutes from './routes/message.routes.js';
import {app,server} from './lib/socket.js'
import path from "path";

app.use(cookieParser());
app.use(cors(
    {
        origin:"http://localhost:5173",
        credentials:true
    }
))
dotenv.config();
const PORT = process.env.PORT;
const __dirname = path.resolve();
app.use(express.json());
app.use('/api/auth' , auth)
app.use('/api/message',messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
server.listen(PORT,
    ()=>{
    console.log('hello')
    connection_db();
})