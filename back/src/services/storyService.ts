import { randomUUID } from "node:crypto";
import { Repository } from "../mariaDb/repositories/repository";
import { composeHigherOrderAsync } from "../modules/higherOrder/compose";
import { joiValidationPartialApplication } from "../modules/validation/joiHigherOrder";
import { Story, StoryId, StoryRow } from "../types/story/story.type";
import { UserId } from "../types/user/user.type";
import { storyJoiValidationSchema } from "../validationSchema/story";

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
