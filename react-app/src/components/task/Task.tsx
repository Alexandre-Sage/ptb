import { useRef, useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
import { useTask, updateTask } from "../../api/taskApi";
import { serverDateToLocalString } from "../../modules/date";
import { Event } from "../../types/react/event.type";
import { Task, Status } from "../../types/task/task.type";
import { StatusSelect } from "../shared/inputs/select/StatusSelect";
import "../../scss/task/taskCard.scss";
import { getStatus } from "../../modules/getStatus";
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
      <main>
        <p>{task.description}</p>
        <p>{serverDateToLocalString(task.creationDate)}</p>
        <p>{task.status ? getStatus(task.status) : ""}</p>
      </main>
    </section>
  );
};
