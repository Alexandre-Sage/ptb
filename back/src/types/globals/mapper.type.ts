import knex, { Knex } from "knex";
interface Mapper<ObjectType, DbRowType> {
  objectToDbRow: (object: ObjectType) => Knex.DbRecordArr<DbRowType>;
  dbRowToObject: (dbRow: DbRowType) => ObjectType;
}

export { Mapper };
