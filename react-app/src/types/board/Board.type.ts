import { Status } from "../task/task.type";
import { UserId } from "../user/user.type";
export type BoardId = string;
export interface Board {
  id: BoardId;
  boardName: string;
  creationDate: Date;
  editionDate: Date;
  status: Status;
  lastUpdate: Date;
  userId: UserId;
  description: string;
}
