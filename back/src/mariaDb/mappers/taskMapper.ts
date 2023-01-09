import { Mapper } from "../../types/globals/mapper.type";
import { Task, TaskRow } from "../../types/task/task.type";

const dbRowToObject = (dbRow: TaskRow): Task => {
  return {
    id: dbRow.id,
    taskName: dbRow.task_name,
    createdBy: dbRow.created_by,
    storyId: dbRow.story_id,
    affectedUser: dbRow.affected_user,
    description: dbRow.description,
    comments: dbRow.comments,
    finished: dbRow.finished,
    lastUpdate: dbRow.last_update,
    creationDate: dbRow.creation_date,
    finishedDate: dbRow.finished_date,
    editionDate: dbRow.edition_date,
  };
};
const objectToDbRow = (task: Task): TaskRow => {
  return {
    id: task.id,
    task_name: task.taskName,
    created_by: task.createdBy,
    story_id: task.storyId,
    affected_user: task.affectedUser,
    description: task.description,
    comments: task.comments,
    finished: task.finished,
    last_update: task.lastUpdate,
    creation_date: task.creationDate,
    finished_date: task.finishedDate,
    edition_date: task.editionDate,
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
