import { title } from "process";
import React, { ReactNode } from "react";
import { DndContext, useDroppable } from "@dnd-kit/core";
import { useFullStory } from "../../api/storyApi";
import { serverDateToLocalString } from "../../modules/date";
import { getStatus, getStatusFromStoryId } from "../../modules/getStatus";
import { StoryId } from "../../types/story/story.type";
import { Status, Task } from "../../types/task/task.type";
import { SecondaryButton } from "../shared/buttons/SecondaryButton";
import { TaskCard } from "../task/Task";
import "../../scss/story/story.scss";

import "../../scss/story/story.scss";
import { updateTask } from "../../api/taskApi";

export const StorySection = ({ tasks, id }: { tasks: Task[]; id: string }) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });
  return (
    <section ref={setNodeRef} id={id} className="story-section-container">
      <header>
        <h3>{getStatus(id.split("-")[0])}</h3>
      </header>
      <main className="story-section-main" ref={setNodeRef}>
        {tasks
          .filter((task) => task.status === id.split("-")[0])
          .map((task) => (
            <TaskCard task={task} key={task.id} />
          ))}
      </main>
    </section>
  );
};
export const Story = ({ storyId }: { storyId: StoryId }) => {
  const {
    setStory,
    story: { story: currentStory, tasks },
    updateStory,
  } = useFullStory(storyId);
  console.log(currentStory);
  if (!currentStory || !tasks) return <div>Loading...</div>;
  return (
    <section className="story">
      <header className="story-header">
        <h2
          className="story-title"
          style={{
            border: "1px solid red",
            height: 50,
          }}
        >
          {currentStory.storyName}
        </h2>
        <p>{serverDateToLocalString(currentStory.creationDate)}</p>
        <SecondaryButton text="Edit" />
      </header>
      <main className="story-main">
        <DndContext
          onDragStart={() => console.log("drag")}
          onDragEnd={({ active: { id }, over }) => {
            const activeTask = tasks.find((task) => task.id === id);
            if (!activeTask || !over?.id) return;
            updateTask({
              ...activeTask,
              status: getStatusFromStoryId(over?.id as string),
            });
            updateStory();
          }}
        >
          <StorySection tasks={tasks} id={`TO_DO-${storyId}`} />
          <StorySection tasks={tasks} id={`IN_PROGRESS-${storyId}`} />
          <StorySection tasks={tasks} id={`FINISHED-${storyId}`} />
        </DndContext>
      </main>
    </section>
  );
};
