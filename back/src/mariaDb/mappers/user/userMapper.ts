import { User, UserRow } from "../../../types/user/user.type";
import { Mapper } from "../../../types/globals/mapper.type";


const dbRowToObject = (dbRow: UserRow): User => {
  return {
    id: dbRow.id,
    userName: dbRow.user_name,
    email: dbRow.email,
    password: dbRow.password,
    salt: dbRow.salt,
    editionDate: new Date(dbRow.edition_date),
    lastConnection: new Date(dbRow.last_connection),
    creationDate: new Date(dbRow.creation_date),
  };
};
const objectToDbRow = (user: User): UserRow => {
  return {
    id: user.id,
    user_name: user.userName,
    email: user.email,
    password: user.password,
    creation_date: new Date(user.creationDate),
    last_connection: new Date(user.lastConnection),
    edition_date: new Date(user.editionDate),
    salt: user.salt,
  };
};



function Mapper({ dbRowToObject, objectToDbRow }: Mapper<User, UserRow>): Mapper<User, UserRow> {
  return {
    objectToDbRow,
    dbRowToObject,
  };
};

export const UserMapper = () => Mapper({ objectToDbRow, dbRowToObject });
