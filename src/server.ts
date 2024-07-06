import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import routes from './Routes/index'
// import "./Models";
import mongoose, { mongo } from "mongoose";

const server = express();

server.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

server.use(bodyParser.json());

server.use(routes);

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
