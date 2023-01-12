import { randomUUID } from "crypto";
import { transaction } from "../../src/mariaDb/database";
import { TaskMapper } from "../../src/mariaDb/mappers/taskMapper";
import { StoryId } from "../../src/types/story/story.type";
import { Task } from "../../src/types/task/task.type";
import { UserId } from "../../src/types/user/user.type";
import { credentials, getToken } from "../helpers/globals";
import { createNewUser } from "../helpers/user";
import { boardIds, fakeBoards } from "./board";
import { fakeStories, fakeStoryIds } from "./story";
import { createUserData } from "./user";
const { dbRowToObject, objectToDbRow } = TaskMapper();
const initForTask = async () => {
  const { body, status, error } = await createNewUser({
    data: { ...createUserData },
  });
  const { token } = await getToken(credentials);
  await transaction(async (t) => {
    await t.table("boards").insert([...fakeBoards(token.decoded.id)]);
  });
  await transaction(async (t) => {
    await t
      .table("stories")
      .insert([...fakeStories(boardIds[1], token.decoded.id)]);
  });

  return { ...token };
};

const taskFactory = ({
  userId,
  comments,
  createdBy,
  creationDate,
  description,
  editionDate,
  finished,
  finishedDate,
  id,
  lastUpdate,
  storyId,
  taskName,
}: Partial<Task>): Task => ({
  userId: userId ?? null,
  comments: comments ?? null,
  createdBy: createdBy ?? randomUUID(),
  creationDate: creationDate ?? new Date(),
  description: description ?? "Test description",
  editionDate: editionDate ?? new Date(),
  finished: finished ?? false,
  finishedDate: finishedDate ?? null,
  id: id ?? randomUUID(),
  lastUpdate: lastUpdate ?? new Date(),
  storyId: storyId ?? fakeStoryIds[1],
  taskName: taskName ?? "Test task",
});

const tasksIds = [randomUUID(), randomUUID(), randomUUID()];
const tasks = (userId: UserId /* storyId: StoryId */) => {
  return tasksIds.map((id) =>
    objectToDbRow(
      taskFactory({
        /* storyId, */ createdBy: userId,
        id,
        userId: userId,
      })
    )
  );
};
export { initForTask, taskFactory, tasksIds, tasks };
