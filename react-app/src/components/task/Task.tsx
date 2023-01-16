import { useRef, useEffect } from "react";
import Draggable from "react-draggable";
import { useTask, updateTask } from "../../api/taskApi";
import { serverDateToLocalString } from "../../modules/date";
import { Event } from "../../types/react/event.type";
import { Task, Status } from "../../types/task/task.type";
import { StatusSelect } from "../shared/inputs/select/StatusSelect";

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
    <Draggable nodeRef={Ref}>
      <div ref={Ref}>
        <div>
          <h4>{task.taskName}</h4>
          <StatusSelect
            label="Status"
            value={task.status || ""}
            style={{ width: "7rem" }}
            onChange={onStatusChange}
          />
        </div>
        <div>
          <p>{serverDateToLocalString(task.creationDate)}</p>
          <p>{task.status}</p>
        </div>
      </div>
    </Draggable>
  );
};
