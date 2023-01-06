import Joi from "joi";
import { User } from "../types/user/user.type";

export const userJoiValidationSchema = Joi.object<User>({
  id: Joi.string().required(),
  userName: Joi.string().min(3).required(),
  password: Joi.string().min(3).required(),
  email: Joi.string().min(3).required().email(),
  creationDate: Joi.date().required(),
  editionDate: Joi.date().required(),
  salt: Joi.string().required(),
  lastConnection: Joi.date(),
});
