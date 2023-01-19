import { deleteTask, useTasks } from "../../../api/taskApi";
import { Status, TaskId } from "../../../types/task/task.type";
import { Dashboard, DashboardData } from "../../shared/Dashboard";
import { TaskForm } from "../../task/TaskForm";
export const TaskDashboard = () => {
  const [tasks, updateTasks] = useTasks();
  const dashboardData: DashboardData[] = tasks.map((task) => ({
    id: task.id,
    name: task.taskName,
    status: task.status,
    creationDate: task.creationDate,
  }));
  const onDeleteTask = async (taskId: TaskId) => {
    await deleteTask(taskId);
    updateTasks();
  };
  return (
    <Dashboard
      title="Tasks"
      data={dashboardData}
      buttonText="Create task"
      deleteFunction={onDeleteTask}
      resizableDimension={{ height: 650, width: 900 }}
      creationForm={(id) => <TaskForm taskId={id} />}
    />
  );
};
