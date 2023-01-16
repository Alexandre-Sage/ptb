import { useEffect, useState } from "react";
import { ReactSetState } from "../types/react/ReactState.type";
import { StoryId } from "../types/story/story.type";
import { Task, TaskId } from "../types/task/task.type";
import { CrudAPI } from "./fetch/CrudApi";
import { functionalFetch } from "./fetch/fetch";

export class TaskApi extends CrudAPI<Task, TaskId> {
  useTasks = (): [Task[], () => void] => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const updateTasksData = async () => {
      const response = await this.getAllData();
      setTasks(structuredClone(response.tasks));
    };
    useEffect(() => {
      updateTasksData();
    }, []);
    return [tasks, updateTasksData];
  };
  useTask = (taskId?: TaskId) => {
    const [task, setTask] = useState<Task>({} as Task);
    const updateTasksData = async (storyId: TaskId) => {
      const response = await this.getDataById(storyId);
      setTask({
        ...response.task,
        finished: response.task.finished === 0 ? false : true,
      });
    };
    if (taskId) {
      useEffect(() => {
        updateTasksData(taskId);
      }, []);
    }
    return { task, updateTasksData, setTask };
  };
  getTaskByStoryId = async (storyId: StoryId) => {
    return functionalFetch({
      url: `/tasks/story/${storyId}`,
      method: "GET",
    });
  };
}

export const {
  delete: deleteTask,
  getAllData: getTasks,
  getDataById: getTask,
  post: postTask,
  update: updateTask,
  useTasks,
  useTask,
} = new TaskApi("/tasks");
