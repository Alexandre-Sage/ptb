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
  finished: boolean;
  last_update: Date;
  creation_date: Date;
  finished_date: Date | null;
  edition_date: Date;
}
interface Task {
  id: TaskId;
  taskName: string;
  createdBy: UserId;
  storyId: StoryId;
  userId: UserId | null;
  description: string;
  comments: string[] | null;
  finished: boolean;
  lastUpdate: Date;
  creationDate: Date;
  finishedDate: Date | null;
  editionDate: Date;
}

export { TaskId, Task, TaskRow };
