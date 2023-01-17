import { Status } from "../globals/status.type";
import { UserId } from "../user/user.type";

type BoardId = string;
interface BoardRow {
  id: BoardId;
  board_name: string;
  user_id: UserId;
  creation_date: Date;
  last_update: Date;
  status: Status;
  edition_date: Date;
  description: string;
}

interface Board {
  id: BoardId;
  boardName: string;
  userId: UserId;
  creationDate: Date;
  lastUpdate: Date;
  status: Status;
  editionDate: Date;
  description: string;
}
export { Board, BoardRow, BoardId };
