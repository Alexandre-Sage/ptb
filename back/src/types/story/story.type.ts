import { BoardId } from "../board/board.type";
import { Status } from "../globals/status.type";
import { UserId } from "../user/user.type";

type StoryId = string;

interface StoryRow {
  id: StoryId;
  story_name: string;
  board_id: BoardId;
  creation_date: Date;
  user_id: UserId;
  last_update: Date;
  status: Status;
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
  status: Status;
  editionDate: Date;
  description: string;
}

export { StoryId, Story, StoryRow };
