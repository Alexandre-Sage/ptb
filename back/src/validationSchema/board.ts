import Joi from "joi";
import { Board } from "../types/board/board.type";

export const boardJoiValidationSchema = Joi.object<Board>({
  id: Joi.string().required(),
  userId: Joi.string().required(),
  boardName: Joi.string().min(2).required(),
  status: Joi.string().required(),
  lastUpdate: Joi.date().required(),
  creationDate: Joi.date().required(),
  editionDate: Joi.date().required(),
  description: Joi.string().required(),
});
