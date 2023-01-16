import { BoardId } from "../board/Board.type";
import { UserId } from "../user/user.type";

export type StoryId = string;
export interface Story {
  id: StoryId;
  storyName: string;
  boardId: BoardId;
  creationDate: Date;
  userId: UserId;
  lastUpdate: Date;
  finished: boolean;
  finishedDate: Date | null;
  editionDate: Date;
  description: string;
}
