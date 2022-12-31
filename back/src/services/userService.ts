import { pbkdf2Sync, randomBytes, randomUUID } from "crypto";
import { User } from "../types/user/user.type";
import { userRepository } from "../mariaDb/repositories/userRepository";
import { CustomError } from "../modules/errors/customError";
import { setToken } from "../modules/auth/jsonWebToken";


const { create, getById, getPasswordAndSalt } = userRepository()
const hashPassword = (password: string) => {
  const salt = randomBytes(25).toString("hex");
  return {
    salt,
    password: pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex")
  };
};

export const authentification = async ({ password, userName }: Pick<User, "password" | "userName">) => {
  const { salt, id, password: dbPassword } = await getPasswordAndSalt(userName)
  const hashedPassword = pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  if (dbPassword !== hashedPassword) throw new CustomError(
    400,
    "Invalid password"
  )
  return setToken({ id, userName })
}
export const createUser = ({ email, password, userName }: Pick<User, "password" | "userName" | "email">) => {
  const now = new Date();
  const id = randomUUID()
  const { salt, password: hashedPassword } = hashPassword(password);
  return create({
    id,
    userName,
    email,
    salt,
    password: hashedPassword,
    creationDate: now,
    editionDate: now,
    lastConnection: now,
  })
}

