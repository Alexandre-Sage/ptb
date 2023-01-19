import { useRef, useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
import { useTask, updateTask } from "../../api/taskApi";
import { serverDateToLocalString } from "../../modules/date";
import { Event } from "../../types/react/event.type";
import { Task, Status } from "../../types/task/task.type";
import { StatusSelect } from "../shared/inputs/select/StatusSelect";
import "../../scss/task/taskCard.scss";
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
  const onStatusChange = async ({ target: { value, name } }: Event) => {
    setTask({
      ...task,
      status: value as Status,
    });
    await updateTask({
      ...task,
      status: value as Status,
    });
    if (updateStory) updateStory();
  };
  return (
    <section
      {...listeners}
      {...attributes}
      ref={setNodeRef}
      className="task-container"
    >
      <header>
        <h4>{task.taskName}</h4>
        <div>
          <StatusSelect
            label="Status"
            value={task.status || ""}
            style={{ width: "5rem", height: "1.5rem" }}
            onChange={onStatusChange}
          />
        </div>
      </header>
      <main>
        <p>{serverDateToLocalString(task.creationDate)}</p>
        <p>{task.status}</p>
      </main>
    </section>
  );
};
