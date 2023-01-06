import knex, { Knex } from "knex";
import { Mapper } from "../types/globals/mapper.type";
import "dotenv/config";
import { curryPatternAsync } from "../modules/higherOrder/curry";
type DatabaseClient = Knex<any, unknown[]>;
type DbTransaction = Knex.Transaction;

const connection = knex({
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    port: parseInt(`${process.env.DB_PORT}`),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
});

const databaseTransaction = async <ObjectType, DbRowType>(
  databaseInstance: Knex,
  callBack: (
    transaction: DbTransaction
  ) => Promise<void | DbRowType | DbRowType[]>
) =>
  databaseInstance.transaction(
    async (transaction) => await callBack(transaction)
  );

const transaction = curryPatternAsync(databaseTransaction)(connection);

export {
  DbTransaction,
  DatabaseClient,
  connection,
  databaseTransaction,
  transaction,
};
