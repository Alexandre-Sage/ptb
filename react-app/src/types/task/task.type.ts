import { StoryId } from "../story/story.type";
import { UserId } from "../user/user.type";

type TaskId = string;

const STATUS = {
  TO_DO: "TO_DO",
  IN_PROGRESS: "IN_PROGRESS",
  FINISHED: "FINISHED",
} as const;

type ObjectValue<T> = T[keyof T];

type Status = ObjectValue<typeof STATUS>;

interface Task {
  id: TaskId;
  taskName: string;
  createdBy: UserId;
  storyId: StoryId;
  userId: UserId | null;
  description: string;
  comments: string[] | null;
  lastUpdate: Date;
  creationDate: Date;
  editionDate: Date;
  status: Status;
}

export { type Task, type Status, type TaskId, type ObjectValue, STATUS };
