import { Task } from "../task/task.type";
import { Story } from "./story.type";

export interface FullStory {
  story: Story;
  //toDoTasks: Task[];
  //inProgressTasks: Task[];
  //finishedTasks: Task[];
  tasks: Task[];
}
