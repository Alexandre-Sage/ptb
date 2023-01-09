import { randomUUID } from "node:crypto";
import { BoardMapper } from "../../src/mariaDb/mappers/boardMapper";
import { Board } from "../../src/types/board/board.type";
import { UserId } from "../../src/types/user/user.type";

const boardFactory = ({
  boardName,
  creationDate,
  description,
  editionDate,
  finished,
  finishedDate,
  id,
  lastUpdate,
  userId,
}: Partial<Board>) => ({
  boardName: boardName ?? "random board",
  creationDate: creationDate ?? new Date(),
  description: description ?? "descritpion",
  editionDate: editionDate ?? new Date(),
  finished: finished ?? false,
  finishedDate: finishedDate ?? null,
  id: id ?? randomUUID(),
  lastUpdate: lastUpdate ?? new Date(),
  userId: userId ?? randomUUID(),
});
const { objectToDbRow } = BoardMapper();
const boardIds = [
  randomUUID(),
  "9927ec50-1ea1-4960-b2b8-b7b348349541",
  randomUUID(),
  randomUUID(),
];
const fakeBoards = (userId: UserId) =>
  boardIds.map((id) =>
    objectToDbRow(
      boardFactory({
        id,
        userId,
      })
    )
  );
export { boardFactory, boardIds, fakeBoards };
