import { title } from "process";
import React, { ReactNode } from "react";
import { useFullStory } from "../../api/storyApi";
import { serverDateToLocalString } from "../../modules/date";
import { getStatus } from "../../modules/getStatus";
import { StoryId } from "../../types/story/story.type";
import { Status } from "../../types/task/task.type";
import { SecondaryButton } from "../shared/buttons/SecondaryButton";
import { TaskCard } from "../task/Task";
import "../../scss/story/story.scss";
export const StorySection = ({
  tasks,
  status,
}: {
  tasks: ReactNode;
  status: Status;
}) => {
  return (
    <section className="story-section-container">
      <header className="story-section-header">
        <h3>{getStatus(status)}</h3>
      </header>
      <main className="story-section-main">{tasks}</main>
    </section>
  );
};
export const Story = ({ storyId }: { storyId: StoryId }) => {
  const {
    setStory,
    story: { finishedTasks, toDoTasks, inProgressTasks, story },
    updateStory,
  } = useFullStory(storyId);
  if (!finishedTasks || !toDoTasks || !inProgressTasks)
    return <div>Loading ....</div>;
  const toDoTasksJsx = toDoTasks.map((task) => (
    <TaskCard key={task.id} task={task} updateStory={updateStory} />
  ));
  const inProgressTasksJsx = inProgressTasks.map((task) => (
    <TaskCard key={task.id} task={task} updateStory={updateStory} />
  ));
  const finishedTasksJsx = finishedTasks.map((task) => (
    <TaskCard key={task.id} task={task} updateStory={updateStory} />
  ));
  return (
    <section className="story">
      <header className="story-header">
        <h2 className="story-title">{story.storyName}</h2>
        <p>{serverDateToLocalString(story.creationDate)}</p>
        <SecondaryButton text="Edit" />
      </header>
      <main className="story-main">
        <StorySection tasks={toDoTasksJsx} status="TO_DO" />
        <StorySection tasks={inProgressTasksJsx} status="IN_PROGRESS" />
        <StorySection tasks={finishedTasksJsx} status="FINISHED" />
      </main>
    </section>
  );
};
