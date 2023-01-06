import { Repository } from "../mariaDb/repositories/repository";
import {
  composeHigherOrderAsync,
  composeHigherOrderMultiType,
  composeHigherOrderMutliTypeAsync,
} from "../modules/higherOrder/compose";
import { Board, BoardId, BoardRow } from "../types/taskBoard/board.type";

import Joi from "joi";
import { joiValidationPartialApplication } from "../modules/validation/joiHigherOrder";
import { randomUUID } from "crypto";
import { UserId } from "../types/user/user.type";

export const boardJoiValidationSchema = Joi.object<Board>({
  id: Joi.string().required(),
  userId: Joi.string().required(),
  boardName: Joi.string().min(2).required(),
  finished: Joi.boolean().required(),
  finishedDate: Joi.not(),
  lastUpdate: Joi.date().required(),
  creationDate: Joi.date().required(),
  editionDate: Joi.date().required(),
  description: Joi.string().required(),
});

export class BoardService {
  constructor(private readonly repository: Repository<Board, BoardRow>) {
    this.repository = repository;
  }
  create = async ({ boardName, userId, description }: Board) => {
    const now = new Date();
    const board = {
      boardName,
      userId,
      description,
      creationDate: now,
      editionDate: now,
      finished: false,
      finishedDate: null,
      id: randomUUID(),
      lastUpdate: now,
    };
    return composeHigherOrderAsync({
      firstToExecute: joiValidationPartialApplication(boardJoiValidationSchema),
      secondToExecute: this.repository.create,
    })(board);
  };
  getAll = async (userId: UserId) => {
    return this.repository.getAll(userId);
  };
  getById = async (boardId: BoardId) => {
    return this.repository.getById(boardId);
  };
  update = async (data: Board) => {
    const now = new Date();
    return composeHigherOrderAsync({
      firstToExecute: joiValidationPartialApplication(boardJoiValidationSchema),
      secondToExecute: this.repository.update,
    })(data);
  };
  delete = async (id: BoardId) => {
    return this.repository.deleteEntry(id);
  };
}
