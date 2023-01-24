import { useRef, useEffect, useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { useTask, updateTask } from "../../api/taskApi";
import { serverDateToLocalString } from "../../modules/date";
import { Event } from "../../types/react/event.type";
import { Task, Status } from "../../types/task/task.type";
import { StatusSelect } from "../shared/inputs/select/StatusSelect";
import "../../scss/task/taskCard.scss";
import { getStatus } from "../../modules/getStatus";
import React from "react";
export const TaskCard = ({
  task: currentTask,
  updateStory,
}: {
  task: Task;
  updateStory?: () => void;
}) => {
  const { task, setTask, updateTasksData } = useTask();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });
  const [hover, setHover] = useState<boolean>(false);
  useEffect(() => {
    setTask(currentTask);
  }, []);
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <section
      {...listeners}
      {...attributes}
      style={style}
      ref={setNodeRef}
      className="task-container"
      id={task.id}
    >
      <header>
        <h4>{task.taskName}</h4>
      </header>
      <main
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {hover ? (
          <p>{task.description}</p>
        ) : (
          <React.Fragment>
            <p>{serverDateToLocalString(task.creationDate)}</p>
            <p>{task.status ? getStatus(task.status) : ""}</p>
          </React.Fragment>
        )}
      </main>
    </section>
  );
};
