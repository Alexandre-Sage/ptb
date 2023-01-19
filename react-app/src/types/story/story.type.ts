import { BoardId } from "../board/Board.type";
import { Status } from "../task/task.type";
import { UserId } from "../user/user.type";

export type StoryId = string;
export interface Story {
  id: StoryId;
  storyName: string;
  boardId: BoardId;
  creationDate: Date;
  userId: UserId;
  lastUpdate: Date;
  status: Status;
  editionDate: Date;
  description: string;
}
