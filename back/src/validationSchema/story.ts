import Joi from "joi";
import { Story } from "../types/story/story.type";

export const storyJoiValidationSchema = Joi.object<Story>({
  id: Joi.string().required(),
  storyName: Joi.string().required(),
  boardId: Joi.string().required(),
  creationDate: Joi.date().required(),
  editionDate: Joi.date().required(),
  finished: Joi.boolean().required(),
  finishedDate: Joi.not(),
  lastUpdate: Joi.date().required(),
  description: Joi.string().required(),
  userId: Joi.string().required(),
});
