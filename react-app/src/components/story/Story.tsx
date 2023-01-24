import { DndContext, DragEndEvent } from "@dnd-kit/core";
import React, { useState } from "react";
import { useFullStory } from "../../api/storyApi";
import { updateTask } from "../../api/taskApi";
import { getStatus, getStatusFromStoryId } from "../../modules/getStatus";
import "../../scss/story/story.scss";
import { StoryId } from "../../types/story/story.type";
import { SecondaryButton } from "../shared/buttons/SecondaryButton";
import { Modal, useModal } from "../shared/modal/Modal";
import { TaskForm } from "../task/TaskForm";
import { StoryForm } from "./StoryForm";
import { StorySection } from "./StorySection";

export const Story = ({ storyId }: { storyId: StoryId }) => {
  const { toggleModal, setModal } = useModal();
  const [toggleTaskForm, setTaskForm] = useState<boolean>(false);
  const {
    setStory,
    story: { story: currentStory, tasks },
    updateStory,
  } = useFullStory(storyId);
  console.log(currentStory);
  if (!currentStory || !tasks) return <div>Loading...</div>;
  const onDrag = ({ active: { id }, over }: DragEndEvent) => {
    const activeTask = tasks.find((task) => task.id === id);
    if (!activeTask || !over?.id) return;
    updateTask({
      ...activeTask,
      status: getStatusFromStoryId(over?.id as string),
    });
    updateStory();
  };
  return (
    <React.Fragment>
      <section className="story">
        <header className="story-header">
          <h2 className="story-title">{currentStory.storyName}</h2>
          <p>Status: {getStatus(currentStory.status)}</p>
          <div className="actions-container">
            <SecondaryButton
              text="Edit"
              onClick={() => setModal((prev) => !prev)}
            />
            <SecondaryButton
              text="Add task"
              onClick={() => setTaskForm((prev) => !prev)}
            />
          </div>
        </header>
        <main className="story-main">
          <DndContext onDragEnd={onDrag}>
            <StorySection tasks={tasks} id={`TO_DO-${storyId}`} />
            <StorySection tasks={tasks} id={`IN_PROGRESS-${storyId}`} />
            <StorySection tasks={tasks} id={`FINISHED-${storyId}`} />
          </DndContext>
        </main>
      </section>
      <Modal setModal={setModal} toggleModal={toggleModal}>
        <StoryForm storyId={storyId} />
      </Modal>
      <Modal setModal={setTaskForm} toggleModal={toggleTaskForm}>
        <TaskForm storyId={storyId} update={updateStory} />
      </Modal>
    </React.Fragment>
  );
};
