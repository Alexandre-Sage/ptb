import { Board, BoardRow } from "../../types/taskBoard/board.type";
import { connection, databaseTransaction, transaction } from "../database";
import { BoardMapper } from "../mappers/boardMapper";
import { UserMapper } from "../mappers/user/userMapper";
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
