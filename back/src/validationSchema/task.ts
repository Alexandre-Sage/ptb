import Joi from "joi";
import { Task } from "../types/task/task.type";

export const taskJoiValidationSchema = Joi.object<Task>({
  userId: Joi.not(),
  comments: Joi.not(),
  createdBy: Joi.string().required(),
  creationDate: Joi.date().required(),
  description: Joi.string().optional(),
  editionDate: Joi.date().required(),
  id: Joi.string().required(),
  lastUpdate: Joi.date().required(),
  storyId: Joi.string().required(),
  taskName: Joi.string().required(),
  status: Joi.string().required(),
});
