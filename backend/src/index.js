import express  from "express";
import dotenv from 'dotenv';
import auth from "./routes/auth.routes.js"
import { connection_db } from "./lib/db.js";
import cookieParser from "cookie-parser";
import messageRoutes from './routes/message.routes.js';
const app = express();
app.use(cookieParser());
dotenv.config();
const PORT = process.env.PORT;
app.use(express.json());
app.use('/api/auth' , auth)
app.use('/api/message',messageRoutes);
app.listen(PORT,
    ()=>{
    console.log('hello')
    connection_db();
})