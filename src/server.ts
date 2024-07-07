import dotenv from "dotenv";
dotenv.config();
import http from "http";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {Server} from 'socket.io';
import routes from './Routes/index'
import mongoose, { mongo } from "mongoose";

const app  = express();
const server  = http.createServer(app)

const io = new Server(server , {
  cors:{
      origin:process.env.ORIGIN,
  }
});

app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

app.use(bodyParser.json());

app.use(routes);

// Socket.IO event handling
io.on('connection', (socket) => {

  socket.on('newComment',(data) =>{
    io.emit('newComment',data)
  })
  socket.on('vote',(data) => {
  
    io.emit('vote', data)
  })
});

(async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_SRV);
    server.listen(process.env.PORT, () =>
      console.log(`server is running on ${process.env.PORT}`)
    );
  } 
  catch (error) {
    console.log(error);
  }
})();
