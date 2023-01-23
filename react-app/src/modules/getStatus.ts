import { Status } from "../types/task/task.type";

export const getStatus = (status: string) =>
  status.toLowerCase().split("_").join(" ");

export const getStatusFromStoryId = (storyId: string) =>
  storyId.split("-")[0] as Status;
