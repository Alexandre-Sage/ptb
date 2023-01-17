import { postTask, updateTask, useTask } from "../../api/taskApi";
import { Event } from "../../types/react/event.type";
import { TaskId } from "../../types/task/task.type";
import { MainButton } from "../shared/buttons/MainButton";
import { StoriesSelect } from "../shared/inputs/select/StorySelect";
import { TextArea } from "../shared/inputs/TextArea";
import { TextInput } from "../shared/inputs/TextInput";
import "../../scss/form/taskForm.scss";
export const TaskForm = ({ taskId }: { taskId?: TaskId }) => {
  const { task, updateTasksData, setTask } = useTask(taskId);
  const onInputChange = ({ currentTarget: { value, name } }: Event) =>
    setTask((task) => ({
      ...structuredClone(task),
      [name]: value,
    }));
  console.log(task);
  return (
    <form className="task-form">
      <StoriesSelect onChange={onInputChange} value={task.storyId ?? ""} />
      <TextInput
        name="taskName"
        label="Task name"
        onChange={onInputChange}
        value={task.taskName ?? ""}
      />
      <TextArea
        name="description"
        label="Description"
        onChange={onInputChange}
        value={task.description ?? ""}
      />
      <MainButton
        text="Save"
        onClick={async (event) => {
          event.preventDefault();
          if (taskId) await updateTask(task);
          else await postTask(task);
        }}
      />
    </form>
  );
};
