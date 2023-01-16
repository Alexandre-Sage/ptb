import { StoryId } from "../story/story.type";
import { User, UserId } from "../user/user.type";

type TaskId = string;
interface TaskRow {
  id: TaskId;
  task_name: string;
  created_by: UserId;
  story_id: StoryId;
  user_id: UserId | null;
  description: string;
  comments: string[] | null;
  last_update: Date;
  creation_date: Date;
  edition_date: Date;
  status: TaskStatus;
}
type TaskStatus = "TO_DO" | "IN_PROGRESS" | "FINISHED";
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
  status: TaskStatus;
}

export { TaskId, Task, TaskRow };
