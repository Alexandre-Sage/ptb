import { randomUUID } from "node:crypto";
import { Repository } from "../mariaDb/repositories/repository";
import { StoryCustomMethods } from "../mariaDb/repositories/storyRepository";
import { composeHigherOrderAsync } from "../modules/higherOrder/compose";
import { joiValidationPartialApplication } from "../modules/validation/joiHigherOrder";
import { BoardId } from "../types/board/board.type";
import { Story, StoryId, StoryRow } from "../types/story/story.type";
import { UserId } from "../types/user/user.type";
import { storyJoiValidationSchema } from "../validationSchema/story";

export class StoryService {
  constructor(
    private readonly repository: Repository<Story, StoryRow, StoryCustomMethods>
  ) {
    this.repository = repository;
  }
  create = async (data: Story) => {
    const now = new Date();
    const story: Story = {
      ...data,
      id: randomUUID(),
      creationDate: now,
      editionDate: now,
      status: "TO_DO",
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
  getByBoardId = async (id: BoardId) => {
    return this.repository.getByBoardId(id);
  };
}
