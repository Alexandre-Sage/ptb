import { randomUUID } from "crypto";
import { transaction } from "../../src/mariaDb/database";
import { StoryMapper } from "../../src/mariaDb/mappers/storyMapper";
import { Story } from "../../src/types/story/story.type";
import { BoardId } from "../../src/types/taskBoard/board.type";
import { UserId } from "../../src/types/user/user.type";
import { getToken, credentials } from "../helpers/globals";
import { createNewUser } from "../helpers/user";
import { fakeBoards } from "./board";
import { createUserData } from "./user";

export const initForStory = async () => {
  const { body, status, error } = await createNewUser({
    data: { ...createUserData },
  });
  const { token } = await getToken(credentials);
  await transaction(async (t) => {
    await t.table("boards").insert([...fakeBoards(token.decoded.id)]);
  });
  return { ...token };
};
export const fakeStoryIds = [
  randomUUID(),
  "62904ff0-ded2-49ec-874e-538b9425ad50",
  randomUUID(),
];
const { objectToDbRow } = StoryMapper();
export const storyFactory = ({
  boardId,
  creationDate,
  description,
  editionDate,
  finished,
  finishedDate,
  id,
  lastUpdate,
  storyName,
  userId,
}: Partial<Story>) => ({
  id: id ?? randomUUID(),
  finished: finished ?? false,
  description: description ?? "Story test",
  boardId: boardId ?? randomUUID(),
  finishedDate: finishedDate ?? null,
  lastUpdate: lastUpdate ?? new Date(),
  storyName: storyName ?? "test story",
  editionDate: editionDate ?? new Date(),
  creationDate: creationDate ?? new Date(),
  userId: userId ?? randomUUID(),
});
export const fakeStories = (boardId: BoardId, userId: UserId) => {
  return fakeStoryIds.map((id) =>
    objectToDbRow(storyFactory({ id, userId, boardId }))
  );
};
