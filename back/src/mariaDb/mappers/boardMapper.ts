import { Board, BoardId, BoardRow } from "../../types/board/board.type";
import { Mapper } from "../../types/globals/mapper.type";

const dbRowToObject = (dbRow: BoardRow): Board => {
  return {
    id: dbRow.id,
    boardName: dbRow.board_name,
    creationDate: dbRow.creation_date,
    editionDate: dbRow.edition_date,
    status: dbRow.status,
    lastUpdate: dbRow.last_update,
    userId: dbRow.user_id,
    description: dbRow.description,
  };
};
const objectToDbRow = (board: Board): BoardRow => {
  return {
    id: board.id,
    board_name: board.boardName,
    user_id: board.userId,
    creation_date: board.creationDate,
    edition_date: board.editionDate,
    status: board.status,
    description: board.description,
    last_update: board.lastUpdate,
  };
};

function Mapper({
  dbRowToObject,
  objectToDbRow,
}: Mapper<Board, BoardRow>): Mapper<Board, BoardRow> {
  return {
    objectToDbRow,
    dbRowToObject,
  };
}

export const BoardMapper = () => Mapper({ objectToDbRow, dbRowToObject });
