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
      const { story } = req.body;
      try {
        await decodeToken(req);
        await service.create(story);
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
      console.log(id);
      try {
        const { id, userName } = await decodeToken(req);
        const story = await service.getById(id);
        console.log(story);
        res.status(200).json({});
      } catch (error) {
        console.log(error);
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
