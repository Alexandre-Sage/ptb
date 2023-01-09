import express, { Request, Response } from "express";
import { threadId } from "node:worker_threads";
import { decodeToken } from "../modules/auth/jsonWebToken";
import {
  composeHigherOrderMultiType,
  composeHigherOrderMutliTypeAsync,
} from "../modules/higherOrder/compose";
import { BoardService } from "../services/boardService";
import { Board } from "../types/board/board.type";

export class BoardRouter {
  private readonly router = express.Router();
  constructor(private readonly service: BoardService) {
    this.service = service;
  }
  initRouter = () => {
    const { router, service } = this;
    router.post(`/`, async function (req: Request, res: Response) {
      const { board } = req.body;
      try {
        const { id: tokenId } = await decodeToken(req);
        await service.create({ ...board, userId: tokenId });
        res.status(201).json({
          error: false,
          message: "Board added with success",
        });
      } catch (error) {
        console.log({ createBoard: error });
        res.status(500).json({
          error: true,
          message: "Something wrong happened please retry",
        });
      }
    });

    router.get(`/`, async function (req: Request, res: Response) {
      try {
        const { id } = await decodeToken(req);
        const boards = await service.getAll(id);
        res.status(200).json({
          error: false,
          boards,
        });
      } catch (error) {
        res.status(500).json({
          error: true,
          message: "Something wrong happened please retry",
        });
      }
    });

    router.get(`/:id`, async function (req: Request, res: Response) {
      const { id } = req.params;
      try {
        await decodeToken(req);
        const board = await service.getById(id);
        res.status(200).json({
          board,
          error: false,
        });
      } catch (error) {
        res.status(500).json({
          error: true,
          message: "Something wrong happened please retry",
        });
      }
    });

    router.put(`/:id`, async function (req: Request, res: Response) {
      const { board } = req.body;
      try {
        await service.update(board);
        res.status(201).json({
          message: "Board updated",
          error: false,
        });
      } catch (error) {
        res.status(500).json({
          error: true,
          message: "Something wrong happened please retry",
        });
      }
    });

    router.delete(`/:id`, async function (req: Request, res: Response) {
      const { id } = req.params;
      try {
        await decodeToken(req);
        await service.delete(id);
        res.status(200).json({
          message: "Board deleted",
          error: false,
        });
      } catch (error) {
        res.status(666).json({
          error: true,
          message: "Something wrong happened please retry",
        });
      }
    });
    return router;
  };
}
