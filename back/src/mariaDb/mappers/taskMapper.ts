import { Mapper } from "../../types/globals/mapper.type";
import { Task, TaskRow } from "../../types/task/task.type";

const dbRowToObject = (dbRow: TaskRow): Task => {
  return {
    id: dbRow.id,
    taskName: dbRow.task_name,
    createdBy: dbRow.created_by,
    storyId: dbRow.story_id,
    userId: dbRow.user_id,
    description: dbRow.description,
    comments: dbRow.comments,
    lastUpdate: dbRow.last_update,
    creationDate: dbRow.creation_date,
    editionDate: dbRow.edition_date,
    status: dbRow.status,
  };
};
const objectToDbRow = (task: Task): TaskRow => {
  return {
    id: task.id,
    task_name: task.taskName,
    created_by: task.createdBy,
    story_id: task.storyId,
    user_id: task.userId,
    description: task.description,
    comments: task.comments,
    last_update: task.lastUpdate,
    creation_date: task.creationDate,
    edition_date: task.editionDate,
    status: task.status,
  };
};

function Mapper({
  dbRowToObject,
  objectToDbRow,
}: Mapper<Task, TaskRow>): Mapper<Task, TaskRow> {
  return {
    objectToDbRow,
    dbRowToObject,
  };
}

export const TaskMapper = () => Mapper({ objectToDbRow, dbRowToObject });
