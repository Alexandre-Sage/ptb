import express, { Express } from "express";
import bodyParser from "body-parser";
import knex from "knex";
import cors from "cors";
import http from "http";
import helmet from "helmet";
import { UserRouter } from "./src/router/userRouter";
import "dotenv/config";
import { UserService } from "./src/services/userService";
import { userRepository } from "./src/mariaDb/repositories/userRepository";
import { BoardRouter } from "./src/router/boardRouter";
import { BoardService } from "./src/services/boardService";
import { boardRepository } from "./src/mariaDb/repositories/boardRepository";
const serverInstance = express();
serverInstance.use(bodyParser.json());
serverInstance.use(
  cors({
    origin: "*",
  })
);

const userService = new UserService(userRepository());
const userRouter = new UserRouter(userService).initRouter();
const boardService = new BoardService(boardRepository());
const boardRouter = new BoardRouter(boardService).initRouter();
serverInstance.use("/users", userRouter);
serverInstance.use("/boards", boardRouter);
//server.use(helmet({
//
//}))
const server = http
  .createServer(serverInstance)
  .listen(process.env.PORT, () => {
    console.log({
      listening: true,
      port: process.env.PORT,
    });
  });
export { server };
