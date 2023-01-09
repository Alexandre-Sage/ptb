import { StoryId } from "../story/story.type";
import { User, UserId } from "../user/user.type";

type TaskId = string;
interface TaskRow {
  id: TaskId;
  task_name: string;
  created_by: UserId;
  story_id: StoryId;
  affected_user: UserId;
  description: string;
  comments: string[];
  finished: boolean;
  last_update: Date;
  creation_date: Date;
  finished_date: Date;
  edition_date: Date;
}
interface Task {
  id: TaskId;
  taskName: string;
  createdBy: UserId;
  storyId: StoryId;
  affectedUser: UserId;
  description: string;
  comments: string[];
  finished: boolean;
  lastUpdate: Date;
  creationDate: Date;
  finishedDate: Date;
  editionDate: Date;
}

export { TaskId, Task, TaskRow };
