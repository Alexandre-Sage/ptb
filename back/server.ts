import express, { Express } from "express";
import bodyParser from "body-parser";
import knex from "knex";
import cors from "cors";
import http from "http";
import helmet from "helmet";
import { userRouter } from "./src/router/userRouter";
import "dotenv/config"
const server = express();
server.use(bodyParser.json());
server.use(cors({
  origin: "*",
}));
server.use("/users", userRouter)
//server.use(helmet({
//  
//}))
http.createServer(server).listen(process.env.PORT, () => {
  console.log({
    listening: true,
    port: process.env.PORT
  });
});
export { server }
