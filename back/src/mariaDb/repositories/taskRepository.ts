import { Task, TaskRow } from "../../types/task/task.type";
import { connection, transaction } from "../database";
import { TaskMapper } from "../mappers/taskMapper";
import { Repository } from "./repository";

export interface TaskCustomMethods {}
export const taskRepository = () => {
  return Repository<Task, TaskRow>({
    transaction: transaction,
    connection,
    mapper: TaskMapper,
    table: "tasks",
    //customMethods: (transaction, table) => {
    //  return {  };
    //},
  });
};
