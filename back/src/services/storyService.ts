import { Repository } from "../mariaDb/repositories/repository";
import { Story, StoryId, StoryRow } from "../types/story/story.type";
import Joi from "joi";
import { randomUUID } from "node:crypto";
import { composeHigherOrderAsync } from "../modules/higherOrder/compose";
import { joiValidationPartialApplication } from "../modules/validation/joiHigherOrder";
import { UserId } from "../types/user/user.type";

const storyJoiValidationSchema = Joi.object<Story>({
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

export class StoryService {
  constructor(private readonly repository: Repository<Story, StoryRow>) {
    this.repository = repository;
  }
  create = async (data: Story) => {
    const now = new Date();
    const story: Story = {
      ...data,
      id: randomUUID(),
      creationDate: now,
      editionDate: now,
      finished: false,
      finishedDate: null,
      lastUpdate: now,
    };
    return composeHigherOrderAsync({
      firstToExecute: joiValidationPartialApplication(storyJoiValidationSchema),
      secondToExecute: this.repository.create,
    })(story);
  };
  getAll = async (userId: UserId) => {
    return this.repository.getAll(userId);
  };
  getById = async (storyId: StoryId) => {
    return this.repository.getById(storyId);
  };
  udpate = async (data: Story) => {
    return composeHigherOrderAsync({
      firstToExecute: joiValidationPartialApplication(storyJoiValidationSchema),
      secondToExecute: this.repository.update,
    })(data);
  };
  delete = (id: StoryId) => {
    return this.repository.deleteEntry(id);
  };
}
