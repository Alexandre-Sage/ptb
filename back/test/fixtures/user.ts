import { randomUUID, randomBytes } from "node:crypto";
import { User } from "../../src/types/user/user.type";

export const userFactory = ({
  id,
  creationDate,
  editionDate,
  email,
  lastConnection,
  password,
  salt,
  userName,
}: Partial<User>): User => {
  return {
    id: id ?? randomUUID(),
    creationDate: creationDate ?? new Date(),
    editionDate: editionDate ?? new Date(),
    email: email ?? "test@test.com",
    lastConnection: lastConnection ?? new Date(),
    password: password ?? "test",
    salt: salt ?? randomBytes(75).toString("hex"),
    userName: userName ?? "test",
  };
};

export const createUserData = {
  password: "test",
  passwordConfirmation: "test",
  userName: "test",
  email: "test@test.com",
};
