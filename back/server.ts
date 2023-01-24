import express, { Express } from "express";
import bodyParser from "body-parser";
import knex from "knex";
import cors from "cors";
import http from "http";
import helmet from "helmet";
import { UserRouter } from "./src/router/userRouter";
import { UserService } from "./src/services/userService";
import { userRepository } from "./src/mariaDb/repositories/userRepository";
import { BoardRouter } from "./src/router/boardRouter";
import { BoardService } from "./src/services/boardService";
import { boardRepository } from "./src/mariaDb/repositories/boardRepository";
import { StoryService } from "./src/services/storyService";
import { storyRepository } from "./src/mariaDb/repositories/storyRepository";
import { StoryRouter } from "./src/router/storyRouter";
import { composeHigherOrder } from "./src/modules/higherOrder/compose";
import "dotenv/config";
import { taskRepository } from "./src/mariaDb/repositories/taskRepository";
import { TaskRouter } from "./src/router/taskRouter";
import { TaskService } from "./src/services/taskService";
import morgan from "morgan";
import path from "path";

export class TaskBoardServer {
  serverInstance = express();
  constructor() {}
  initServerOptions = () => {
    this.serverInstance.use(bodyParser.json());
    this.serverInstance.use(
      cors({
        origin: "*",
      })
    );
    this.serverInstance.use(morgan("tiny"));
  };
  initRouteAndServices = () => {
    const userService = new UserService(userRepository());
    const boardService = new BoardService(boardRepository());
    const storyService = new StoryService(storyRepository());
    const taskService = new TaskService(taskRepository());
    const userRouter = new UserRouter(userService).initRouter();
    const boardRouter = new BoardRouter(boardService).initRouter();
    const storyRouter = new StoryRouter(storyService).initRouter();
    const taskRouter = new TaskRouter(taskService).initRouter();
    this.serverInstance.use("/users", userRouter);
    this.serverInstance.use("/boards", boardRouter);
    this.serverInstance.use("/stories", storyRouter);
    this.serverInstance.use("/tasks", taskRouter);
    this.serverInstance.get("/", (req, res) => {
      this.serverInstance.use(express.static(path.join(__dirname, "build")));
      res.sendFile(path.join(__dirname, "build", "index.html"));
    });
  };
  initOptionsAndRoutesHigerOrder = composeHigherOrder({
    firstToExecute: this.initServerOptions,
    secondToExecute: this.initRouteAndServices,
  });
  initHttpServer = () => {
    this.initOptionsAndRoutesHigerOrder();
    const server = http
      .createServer(this.serverInstance)
      .listen(process.env.PORT, () => {
        console.log({
          listening: true,
          port: process.env.PORT,
        });
      });
    return server;
  };
}
const server = new TaskBoardServer().initHttpServer();
export { server };
