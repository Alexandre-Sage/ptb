import { Story, StoryRow } from "../../types/story/story.type";
import { BoardId } from "../../types/taskBoard/board.type";
import { connection, transaction } from "../database";
import { StoryMapper } from "../mappers/storyMapper";
import { Repository } from "./repository";

export interface StoryCustomMethods {
  getByBoardId: (boardId: BoardId) => Promise<Story[]>;
}
export const storyRepository = () => {
  return Repository<Story, StoryRow, StoryCustomMethods>({
    transaction: transaction,
    connection,
    mapper: StoryMapper,
    table: "stories",
    customMethods: (transaction, table): StoryCustomMethods => {
      const { dbRowToObject, objectToDbRow } = StoryMapper();
      const getByBoardId = async (boardId: BoardId) => {
        const rows = (await transaction(async (transaction) => {
          return transaction
            .table(table)
            .select("*")
            .where({ board_id: boardId });
        })) as StoryRow[];
        return rows.map((row: StoryRow) => dbRowToObject(row));
      };
      return { getByBoardId };
    },
  });
};
