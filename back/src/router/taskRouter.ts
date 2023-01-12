import express, { Request, Response } from "express";
import { decodeToken } from "../modules/auth/jsonWebToken";
import { TaskService } from "../services/taskService";

export class TaskRouter {
  private readonly router = express.Router();
  constructor(private readonly service: TaskService) {
    this.service = service;
  }
  initRouter = () => {
    const { router, service } = this;
    router.post(`/`, async function (req: Request, res: Response) {
      const { task } = req.body;
      try {
        const { userName, id } = await decodeToken(req);
        await service.create({ ...task, userId: id });
        res.status(201).json({
          message: "Task added",
          error: false,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          error: true,
          message: "Something went wrong please retry",
        });
      }
    });

    router.get(`/`, async function (req: Request, res: Response) {
      try {
        const { userName, id } = await decodeToken(req);
        const tasks = await service.getAll(id);
        res.status(200).json({
          tasks,
          error: false,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          error: true,
          message: "Something went wrong please retry",
        });
      }
    });

    router.get(`/:id`, async function (req: Request, res: Response) {
      const { id } = req.params;
      try {
        await decodeToken(req);
        const task = await service.getById(id);
        res.status(200).json({
          task,
          error: false,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          error: true,
          message: "Something went wrong please retry",
        });
      }
    });

    router.put(`/:id`, async function (req: Request, res: Response) {
      const { task } = req.body;
      const { id } = req.params;

      try {
        const { userName, id } = await decodeToken(req);
        await service.update(task);
        res.status(201).json({
          error: false,
          message: "Task updated",
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          error: true,
          message: "Something went wrong please retry",
        });
      }
    });

    router.delete(`/:id`, async function (req: Request, res: Response) {
      const { id } = req.params;
      try {
        await decodeToken(req);
        await service.delete(id);
        res.status(200).json({
          message: "Task deleted",
          error: false,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          error: true,
          message: "Something went wrong please retry",
        });
      }
    });
    return router;
  };
}
