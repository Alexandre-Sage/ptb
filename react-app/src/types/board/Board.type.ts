import { UserId } from "../user/user.type";
export type BoardId = string;
export interface Board {
  id: BoardId;
  boardName: string;
  creationDate: Date;
  editionDate: Date;
  finished: boolean | number;
  finishedDate: Date | null;
  lastUpdate: Date;
  userId: UserId;
  description: string;
}
