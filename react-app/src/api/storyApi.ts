import { useEffect, useState } from "react";
import { BoardId } from "../types/board/Board.type";
import { ReactSetState } from "../types/react/ReactState.type";
import { FullStory } from "../types/story/FullStory.type";
import { Story, StoryId } from "../types/story/story.type";
import { Task } from "../types/task/task.type";
import { CrudAPI } from "./fetch/CrudApi";
import { functionalFetch } from "./fetch/fetch";
import { TaskApi } from "./taskApi";

export class StoryApi extends CrudAPI<Story, StoryId> {
  constructor(private readonly taskApi: TaskApi, readonly prefix: string) {
    super(prefix);
  }
  useStories = (): [Story[], () => void] => {
    const [stories, setStories] = useState<Story[]>([]);
    const updateStoriesData = async () => {
      const response = await this.getAllData();
      setStories(structuredClone(response.stories));
    };
    useEffect(() => {
      updateStoriesData();
    }, []);
    return [stories, updateStoriesData];
  };
  useStory = (
    storyId?: StoryId
  ): [Story, (storyId: StoryId) => void, ReactSetState<Story>] => {
    const [story, setStory] = useState<Story>({} as Story);
    const updateStory = async (storyId: StoryId) => {
      const response = await this.getDataById(storyId);
      setStory({
        ...response.story,
        finished: response.story.finished === 0 ? false : true,
      });
    };
    if (storyId) {
      useEffect(() => {
        updateStory(storyId);
      }, []);
    }
    return [story, updateStory, setStory];
  };
  getStoriesByBoardId = (boardId: BoardId) => {
    return functionalFetch({
      url: `/stories/board/${boardId}`,
      method: "GET",
    });
  };
  getFullStory = async (storyId: StoryId) => {
    const story = await this.getDataById(storyId);
    const { tasks } = await this.taskApi.getTaskByStoryId(storyId);
    const toDoTasks = tasks.filter((task: Task) => task.status === "TO_DO");
    const inProgressTasks = tasks.filter(
      (task: Task) => task.status === "IN_PROGRESS"
    );
    const finishedTasks = tasks.filter(
      (task: Task) => task.status === "FINISHED"
    );
    return {
      story,
      toDoTasks,
      inProgressTasks,
      finishedTasks,
    };
  };
  useFullStory = (storyId: StoryId) => {
    const [story, setStory] = useState<FullStory>({} as FullStory);
    const updateStory = async () => {
      const storyWithTasks = await this.getFullStory(storyId);
      setStory(storyWithTasks);
    };
    useEffect(() => {
      updateStory();
    }, []);
    return { story, updateStory, setStory };
  };
}

export const {
  delete: deleteStory,
  getAllData: getStories,
  getDataById: getStory,
  post: postStory,
  update: updateStory,
  useStories,
  useStory,
  getFullStory,
  useFullStory,
} = new StoryApi(new TaskApi("/tasks"), "/stories");
