import { DndContext, DragEndEvent } from "@dnd-kit/core";
import React, { ReactNode, useEffect, useState } from "react";
import { updateStory, useFullStory } from "../../api/storyApi";
import { updateTask } from "../../api/taskApi";
import { getStatus, getStatusFromStoryId } from "../../modules/getStatus";
import "../../scss/story/story.scss";
import { StoryId } from "../../types/story/story.type";
import { SecondaryButton } from "../shared/buttons/SecondaryButton";
import { StatusSelect } from "../shared/inputs/select/StatusSelect";
import { Modal, useModal } from "../shared/modal/Modal";
import { TaskForm } from "../task/TaskForm";
import { StoryForm } from "./StoryForm";
import { StorySection } from "./StorySection";
import { Event } from "../../types/react/event.type";
import { Status } from "../../types/task/task.type";
import { ReactSetState } from "../../types/react/ReactState.type";
export const Story = ({ storyId }: { storyId: StoryId }) => {
  const { toggleModal, setModal } = useModal();
  const [toggleTaskForm, setTaskForm] = useState<boolean>(false);
  const {
    setStory,
    story: { story: currentStory, tasks },
    updateStory: refreshStory,
  } = useFullStory(storyId);
  const [collapse, setCollapse] = useState<boolean>(true);
  console.log(currentStory);
  useEffect(() => {
    if (currentStory && currentStory.status === "FINISHED") setCollapse(false);
  }, []);
  if (!currentStory || !tasks) return <div>Loading...</div>;
  const onDrag = ({ active: { id }, over }: DragEndEvent) => {
    const activeTask = tasks.find((task) => task.id === id);
    if (!activeTask || !over?.id) return;
    setStory(({ story, tasks }) => {
      return {
        story,
        tasks: tasks.map((task) => {
          if (task.id !== activeTask.id) return task;
          return {
            ...task,
            status: getStatusFromStoryId(over?.id as string),
          };
        }),
      };
    });
    updateTask({
      ...activeTask,
      status: getStatusFromStoryId(over?.id as string),
    });
  };
  const onStatusChange = ({ currentTarget: { value, name } }: Event) => {
    setStory(({ story, tasks }) => ({
      tasks,
      story: { ...story, status: value as Status },
    }));
    updateStory({
      ...currentStory,
      status: value as Status,
    });
  };
  return (
    <React.Fragment>
      <section className="story">
        <header className="story-header">
          <h2 className="story-title">{currentStory.storyName}</h2>
          <StatusSelect
            label=""
            value={currentStory.status}
            onChange={onStatusChange}
          />
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
          <div
            className="collapse-button"
            onClick={() => setCollapse((prev) => !prev)}
          >
            +
          </div>
        </header>
        <Collapasable toggle={collapse}>
          <main className="story-main">
            <DndContext onDragEnd={onDrag}>
              <StorySection tasks={tasks} id={`TO_DO-${storyId}`} />
              <StorySection tasks={tasks} id={`IN_PROGRESS-${storyId}`} />
              <StorySection tasks={tasks} id={`FINISHED-${storyId}`} />
            </DndContext>
          </main>
        </Collapasable>
      </section>
      <Modal setModal={setModal} toggleModal={toggleModal}>
        <StoryForm storyId={storyId} />
      </Modal>
      <Modal setModal={setTaskForm} toggleModal={toggleTaskForm}>
        <TaskForm storyId={storyId} update={refreshStory} />
      </Modal>
    </React.Fragment>
  );
};

const Collapasable = ({
  children,
  setToggle,
  toggle,
}: {
  children: ReactNode | JSX.Element;
  toggle: boolean;
  setToggle?: ReactSetState<boolean>;
}) => {
  return (
    <div
      style={{
        width: "100%",
        display: toggle ? "flex" : "none",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
};
