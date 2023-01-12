import { StoryId } from "../../types/story/story.type";
import { Task, TaskRow } from "../../types/task/task.type";
import { connection, transaction } from "../database";
import { TaskMapper } from "../mappers/taskMapper";
import { Repository } from "./repository";

export interface TaskCustomMethods {
  getByStoryId: (storyId: StoryId) => Promise<Task[]>;
}
export const taskRepository = () => {
  return Repository<Task, TaskRow, TaskCustomMethods>({
    transaction: transaction,
    connection,
    mapper: TaskMapper,
    table: "tasks",
    customMethods: (transaction, table, mapper): TaskCustomMethods => {
      const { dbRowToObject, objectToDbRow } = mapper();
      const getByStoryId = async (storyId: StoryId) => {
        const rows = (await transaction(async (transaction) =>
          transaction.table(table).select("*").where({ story_id: storyId })
        )) as TaskRow[];
        return rows.map((row) => dbRowToObject(row));
      };
      return { getByStoryId };
    },
  });
};
