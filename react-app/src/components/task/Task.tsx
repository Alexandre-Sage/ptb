import { useRef, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
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
  const Ref = useRef(null);
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
    <Draggable>
      <section ref={Ref} className="task-container">
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
    </Draggable>
  );
};
