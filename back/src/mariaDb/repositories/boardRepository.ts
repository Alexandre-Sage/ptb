import { Board, BoardRow } from "../../types/board/board.type";
import { connection, databaseTransaction, transaction } from "../database";
import { BoardMapper } from "../mappers/boardMapper";
import { UserMapper } from "../mappers/userMapper";
import { RepositoryParams, Repository } from "./repository";

export interface BoardCustomMethods {}
export const boardRepository = () => {
  return Repository<Board, BoardRow>({
    transaction: transaction,
    connection,
    mapper: BoardMapper,
    table: "boards",
    //customMethods: (transaction, table) => {
    //  return {  };
    //},
  });
};
