import { Knex } from "knex";
import { Mapper } from "../../types/globals/mapper.type";
import { DatabaseClient, DbTransaction } from "../database";


interface Repository<ObjectType, DbRowType, CustomMethods = {}> {
  connection: DatabaseClient
  mapper: () => Mapper<ObjectType, DbRowType>
  transaction: (databaseInstance: Knex, callBack: (transaction: DbTransaction) => Promise<unknown>) => Promise<unknown>
  table: string,
  customMethods?: (
    databaseInstance: Repository<ObjectType, DbRowType, CustomMethods>["transaction"],
    table: Repository<ObjectType, DbRowType, CustomMethods>["table"]
  ) => CustomMethods | {}
}

export const Repository = <ObjectType, DbRowType, CustomMethods = {}>
  ({ transaction, connection, mapper, table, customMethods }: Repository<ObjectType, DbRowType, CustomMethods>) => {
  const { dbRowToObject, objectToDbRow } = mapper()
  const create = async (data: ObjectType) => {
    const row = objectToDbRow(data)
    return transaction(connection, async (transaction) => {
      return transaction
        .table(table)
        .insert({ ...row });
    });
  };
  const getById = async (id: string): Promise<ObjectType> => {
    const row = await transaction(connection, async (transaction) => {
      return transaction
        .table(table)
        .select()
        .where({ id })
        .first()
    }) as DbRowType
    return dbRowToObject(row)
  };

  const customs = customMethods?.(transaction, table) as CustomMethods
  return { create, getById, ...customs };
};

