import express  from "express";
import dotenv from 'dotenv';
import auth from "./routes/auth.routes.js"
import { connection_db } from "./lib/db.js";
const app = express();
dotenv.config();
const PORT = process.env.PORT;
app.use(express.json());
app.use('/api/auth' , auth)
app.listen(PORT,
    ()=>{
    console.log('hello')
    connection_db();
})