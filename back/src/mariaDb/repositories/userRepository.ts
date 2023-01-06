import { User, UserRow } from "../../types/user/user.type";
import { connection, databaseTransaction, transaction } from "../database";
import { UserMapper } from "../mappers/user/userMapper";
import { RepositoryParams, Repository } from "./repository";

export interface UserCustomMethods {
  getPasswordAndSalt: (
    userName: User["userName"]
  ) => Promise<Pick<User, "id" | "password" | "salt">>;
}
export const userRepository = () => {
  return Repository<User, UserRow, UserCustomMethods>({
    transaction: transaction,
    connection,
    mapper: UserMapper,
    table: "users",
    customMethods: (transaction, table) => {
      const getPasswordAndSalt = async (userName: User["userName"]) =>
        transaction(async (transaction) => {
          const row = await transaction
            .table(table)
            .select("password", "salt", "id")
            .where({ user_name: userName })
            .first();

          return {
            id: row.id,
            salt: row.salt,
            password: row.password,
            userName: row.user_name,
          };
        });
      return { getPasswordAndSalt };
    },
  });
};
