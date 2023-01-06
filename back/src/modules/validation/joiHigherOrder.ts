import Joi, { any } from "joi";
import { CustomError } from "../errors/customError";
import { composeHigherOrderAsync } from "../higherOrder/compose";

export const joiValidationPartialApplication = <ObjectType>(
  schema: Joi.ObjectSchema<ObjectType>
) => {
  return (data: ObjectType) => schema.validateAsync(data);
};

export const joiErrorHandling = (err: any) => {
  switch (err.details[0].type.split(".")[1]) {
    case "min":
      err = new CustomError(500, err.message);
      break;
    case "empty":
      console.log("here");
      err = new CustomError(
        500,
        `The field ${err.message.split(`"`)[1]} is empty`
      );
      break;
    case "required":
      err = new CustomError(
        500,
        `The field ${err.message.split(`"`)[1]} is empty`
      );
      break;
  }
  return err;
};
