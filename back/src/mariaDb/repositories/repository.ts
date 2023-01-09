import knex, { Knex } from "knex";
import { Mapper } from "../../types/globals/mapper.type";
import { UserId } from "../../types/user/user.type";
import { DatabaseClient, DbTransaction } from "../database";

export interface RepositoryParams<ObjectType, DbRowType, CustomMethods = {}> {
  connection: DatabaseClient;
  mapper: () => Mapper<ObjectType, DbRowType>;
  transaction: (
    p2: (transaction: DbTransaction) => Promise<unknown>
  ) => Promise<unknown>;
  table: string;
  customMethods?: (
    databaseInstance: RepositoryParams<
      ObjectType,
      DbRowType,
      CustomMethods
    >["transaction"],
    table: RepositoryParams<ObjectType, DbRowType, CustomMethods>["table"]
  ) => CustomMethods | {};
}

export interface RepositoryInterface<ObjectType, DbRowType> {
  create: (data: ObjectType) => Promise<ObjectType>;
  getById: (id: string) => Promise<ObjectType>;
  getAll: (userId: UserId) => Promise<ObjectType[]>;
  update: (data: ObjectType) => Promise<ObjectType>;
  deleteEntry: (id: string) => Promise<unknown>;
}
export type Repository<
  ObjectType,
  DbRowType,
  CustomMethods = {}
> = RepositoryInterface<ObjectType, DbRowType> & CustomMethods;

export const Repository = <ObjectType, DbRowType, CustomMethods = {}>({
  transaction,
  mapper,
  table,
  customMethods,
}: RepositoryParams<ObjectType, DbRowType, CustomMethods>): Repository<
  ObjectType,
  DbRowType,
  CustomMethods
> => {
  const { dbRowToObject, objectToDbRow } = mapper();
  const create = async (data: ObjectType) => {
    const row = objectToDbRow(data);
    return transaction(async (transaction) => {
      return transaction.table(table).insert({ ...row });
    }) as ObjectType;
  };
  const getById = async (id: string): Promise<ObjectType> => {
    const row = (await transaction(async (transaction) => {
      return transaction.table(table).select("*").where({ id: id }).first();
    })) as DbRowType;
    // console.log({ row });
    return dbRowToObject(row);
  };
  const getAll = async (userId: UserId): Promise<ObjectType[]> => {
    const rows = (await transaction(async (transaction) => {
      return await transaction
        .table(table)
        .select("*")
        .where({ user_id: userId });
    })) as DbRowType[];
    return rows.map((row) => dbRowToObject(row));
  };
  const update = async (data: ObjectType) => {
    const row = objectToDbRow(data);

    return transaction(async (transaction) => {
      return await transaction
        .table(table)
        .update({ ...row })
        .where({ id: data["id" as keyof ObjectType] });
    }) as ObjectType;
  };
  const deleteEntry = async (id: string) => {
    return transaction(async (transaction) => {
      await transaction.table(table).delete().where({ id });
    });
  };
  const customs = customMethods?.(transaction, table) as CustomMethods;
  return { create, getById, getAll, update, deleteEntry, ...customs };
};
