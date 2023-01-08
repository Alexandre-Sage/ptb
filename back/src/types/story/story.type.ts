import { BoardId } from "../taskBoard/board.type";
import { UserId } from "../user/user.type";

type StoryId = string;

interface StoryRow {
  id: StoryId;
  story_name: string;
  board_id: BoardId;
  creation_date: Date;
  user_id: UserId;
  last_update: Date;
  finished: boolean;
  finished_date: Date | null;
  edition_date: Date;
  description: string;
}
interface Story {
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

export { StoryId, Story, StoryRow };
