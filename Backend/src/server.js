import express from 'express'
import 'dotenv/config'
import { connectDb } from './database/db.js';
import cookieParser from "cookie-parser";
import cors from 'cors'
import authRouter from "./routes/user.route.js"
import messageRouter from "./routes/message.route.js"
import { app, server } from './lib/socket.js';


app

const PORT=9999

 
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended:true}));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use('/api/auth',authRouter)
app.use('/api/message',messageRouter)

app.get('/',(req,res)=>{
    res.end("Hello ji kaise ho app, Sab theek!")
})


server.listen(PORT,()=>{
    console.log(`Server is runnig at port ${PORT}`)
    connectDb();
})