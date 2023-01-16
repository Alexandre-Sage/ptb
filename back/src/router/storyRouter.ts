import express, { Request, Response } from "express";
import { decodeToken } from "../modules/auth/jsonWebToken";
import { StoryService } from "../services/storyService";

export class StoryRouter {
  private readonly router = express.Router();
  constructor(private readonly service: StoryService) {
    this.service = service;
  }
  initRouter = () => {
    const { router, service } = this;
    router.post(`/`, async function (req: Request, res: Response) {
      const { data } = req.body;
      try {
        const { id: userId } = await decodeToken(req);
        await service.create({ ...data, userId });
        return res.status(201).json({
          message: "Story added",
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
        const { id, userName } = await decodeToken(req);
        const stories = await service.getAll(id);
        res.status(200).json({
          error: false,
          stories,
        });
      } catch (error) {
        console.log({ debug: error });
        res.status(500).json({
          error: true,
          message: "Something went wrong please retry",
        });
      }
    });

    router.get(`/:id`, async function (req: Request, res: Response) {
      const { id } = req.params;
      try {
        const { userName } = await decodeToken(req);
        const story = await service.getById(id);
        res.status(200).json({
          story,
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
      const { data } = req.body;
      try {
        await decodeToken(req);
        await service.udpate(data);
        res.status(200).json({
          message: "Story updated",
          error: false,
        });
      } catch (error) {
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
          message: "Story deleted",
          error: false,
        });
      } catch (error) {
        res.status(500).json({
          error: true,
          message: "Something went wrong please retry",
        });
      }
    });
    router.get(`/board/:id`, async function (req: Request, res: Response) {
      const { id } = req.params;
      try {
        await decodeToken(req);
        const stories = await service.getByBoardId(id);
        res.status(200).json({
          stories,
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
