import { title } from "process";
import React, { ReactNode } from "react";
import { useFullStory } from "../../api/storyApi";
import { serverDateToLocalString } from "../../modules/date";
import { StoryId } from "../../types/story/story.type";
import { Status } from "../../types/task/task.type";
import { SecondaryButton } from "../shared/buttons/SecondaryButton";
import { TaskCard } from "../task/Task";
export const StorySection = ({
  tasks,
  title,
}: {
  tasks: ReactNode;
  title: Status;
}) => {
  return (
    <section className="story-section-container">
      <header>
        <h3>{title.toLowerCase().split("_").join("")}</h3>
      </header>
      <main>{tasks}</main>
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
      <header>
        <h2>{story.storyName}</h2>
        <p>{serverDateToLocalString(story.creationDate)}</p>
        <SecondaryButton text="Edit" />
      </header>
      <main>
        <StorySection tasks={toDoTasksJsx} title="TO_DO" />
        <StorySection tasks={inProgressTasksJsx} title="IN_PROGRESS" />
        <StorySection tasks={finishedTasksJsx} title="FINISHED" />
      </main>
    </section>
  );
};
