import { User, UserRow } from "../../types/user/user.type";
import { connection, databaseTransaction } from "../database";
import { UserMapper } from "../mappers/user/userMapper";
import { Repository } from "./repository";




interface UserCustomMethods {
  getPasswordAndSalt: (userName: User["userName"]) => Promise<Pick<User, "id" | "password" | "salt">>
}
export const userRepository = () => {

  return Repository<User, UserRow, UserCustomMethods>({
    transaction: databaseTransaction,
    connection,
    mapper: UserMapper,
    table: "users",
    customMethods: (transaction, table) => {
      const getPasswordAndSalt = async (userName: User["userName"]) =>
        transaction(connection, async (transaction) => {
          const row = await transaction.table(table).select("password", "salt", "id").where({ user_name: userName }).first()
          return {
            id: row.id,
            salt: row.salt,
            password: row.password,
          }
        })
      return { getPasswordAndSalt }
    }
  })

}
