import { Repository } from "../mariaDb/repositories/repository";
import { composeHigherOrderAsync } from "../modules/higherOrder/compose";
import { Board, BoardId, BoardRow } from "../types/taskBoard/board.type";

import { randomUUID } from "crypto";
import { joiValidationPartialApplication } from "../modules/validation/joiHigherOrder";
import { UserId } from "../types/user/user.type";
import { boardJoiValidationSchema } from "../validationSchema/board";

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
    return composeHigherOrderAsync({
      firstToExecute: joiValidationPartialApplication(boardJoiValidationSchema),
      secondToExecute: this.repository.update,
    })(data);
  };
  delete = async (id: BoardId) => {
    return this.repository.deleteEntry(id);
  };
}
