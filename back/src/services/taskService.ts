import { randomUUID } from "crypto";
import Joi from "joi";
import { Repository } from "../mariaDb/repositories/repository";
import { composeHigherOrderAsync } from "../modules/higherOrder/compose";
import { joiValidationPartialApplication } from "../modules/validation/joiHigherOrder";
import { Task, TaskId, TaskRow } from "../types/task/task.type";
import { UserId } from "../types/user/user.type";

export const taskJoiValidationSchema = Joi.object<Task>({
  userId: Joi.not(),
  comments: Joi.not(),
  createdBy: Joi.string().required(),
  creationDate: Joi.date().required(),
  description: Joi.string().optional(),
  editionDate: Joi.date().required(),
  finished: Joi.boolean().required(),
  finishedDate: Joi.not(),
  id: Joi.string().required(),
  lastUpdate: Joi.date().required(),
  storyId: Joi.string().required(),
  taskName: Joi.string().required(),
});
export class TaskService {
  constructor(private readonly repository: Repository<Task, TaskRow>) {
    this.repository = repository;
  }
  create = async ({
    taskName,
    description,
    storyId,
    userId,
  }: Task & { userId: UserId }) => {
    const now = new Date();
    const task: Task = {
      id: randomUUID(),
      taskName,
      storyId,
      description,
      createdBy: userId,
      userId: null,
      comments: [],
      finished: false,
      finishedDate: null,
      editionDate: now,
      creationDate: now,
      lastUpdate: now,
    };
    return composeHigherOrderAsync({
      firstToExecute: joiValidationPartialApplication(taskJoiValidationSchema),
      secondToExecute: this.repository.create,
    })(task);
  };
  getAll = async (userId: UserId) => {
    return this.repository.getAll(userId);
  };
  getById = (taskId: TaskId) => {
    return this.repository.getById(taskId);
  };
  update = (data: Task) => {
    return composeHigherOrderAsync({
      firstToExecute: joiValidationPartialApplication(taskJoiValidationSchema),
      secondToExecute: this.repository.update,
    })(data);
  };
  delete = (id: TaskId) => {
    return this.repository.deleteEntry(id);
  };
}
