import { title } from "process";
import React, { ReactNode } from "react";
import { DndContext, useDroppable } from "@dnd-kit/core";
import { useFullStory } from "../../api/storyApi";
import { serverDateToLocalString } from "../../modules/date";
import { StoryId } from "../../types/story/story.type";
import { Status } from "../../types/task/task.type";
import { SecondaryButton } from "../shared/buttons/SecondaryButton";
import { TaskCard } from "../task/Task";
import "../../scss/story/story.scss";

import "../../scss/story/story.scss";

export const StorySection = ({
  tasks,
  id,
}: {
  tasks: ReactNode;
  id: Status;
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });
  return (
    <section id={id} className="story-section-container">
      <header>
        <h3>{id.toLowerCase().split("_").join("")}</h3>
      </header>
      <main className="story-section-container" ref={setNodeRef}>
        {tasks}
      </main>
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
      {/* <DndContext onDragStart={() => console.log("drag")}> */}
      <main className="story-main">
        <StorySection tasks={toDoTasksJsx} id="TO_DO" />
        <StorySection tasks={inProgressTasksJsx} id="IN_PROGRESS" />
        <StorySection tasks={finishedTasksJsx} id="FINISHED" />
      </main>
      {/* </DndContext> */}
    </section>
  );
};
