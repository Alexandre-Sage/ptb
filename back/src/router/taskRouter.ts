import express, { Request, Response } from "express";
import { decodeToken } from "../modules/auth/jsonWebToken";
import { StoryService } from "../services/storyService";
import { TaskService } from "../services/taskService";

export class TaskRouter {
  private readonly router = express.Router();
  constructor(private readonly service: TaskService) {
    this.service = service;
  }
  initRouter = () => {
    const { router, service } = this;
    router.post(`/url`, function (req: Request, res: Response) {
      const {} = req.body;
      try {
        res.status(200).json({});
      } catch (error) {
        res.status(666).json({});
      }
    });

    router.get(`/url`, function (req: Request, res: Response) {
      try {
        res.status(200).json({});
      } catch (error) {
        res.status(666).json({});
      }
    });

    router.get(`/url/:id`, function (req: Request, res: Response) {
      try {
        res.status(200).json({});
      } catch (error) {
        res.status(666).json({});
      }
    });

    router.put(`/url/:id`, function (req: Request, res: Response) {
      const {} = req.body;
      try {
        res.status(200).json({});
      } catch (error) {
        res.status(666).json({});
      }
    });

    router.delete(`/url/:id`, function (req: Request, res: Response) {
      try {
        res.status(200).json({});
      } catch (error) {
        res.status(666).json({});
      }
    });
    return router;
  };
}
