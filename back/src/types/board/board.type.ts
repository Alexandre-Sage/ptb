import { UserId } from "../user/user.type";

type BoardId = string;
interface BoardRow {
  id: BoardId;
  board_name: string;
  user_id: UserId;
  creation_date: Date;
  last_update: Date;
  finished: boolean | number;
  finished_date: Date | null;
  edition_date: Date;
  description: string;
}

interface Board {
  id: BoardId;
  boardName: string;
  userId: UserId;
  creationDate: Date;
  lastUpdate: Date;
  finished: boolean;
  finishedDate: Date | null;
  editionDate: Date;
  description: string;
}
export { Board, BoardRow, BoardId };
