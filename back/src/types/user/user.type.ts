type UserId = string;
interface UserRow {
  id: UserId;
  user_name: string;
  email: string;
  password: string;
  creation_date: Date;
  last_connection: Date;
  edition_date: Date;
  salt: string;
};
interface User {
  id: UserId;
  userName: string;
  email: string;
  password: string;
  creationDate: Date;
  lastConnection: Date;
  editionDate: Date;
  salt: string;
};

export { UserId, User, UserRow }
